import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { logsRequest } from '../../services/Api';
import Swal from 'sweetalert2';
import { datetimeBr } from '../../services/Helpers/format';

let timer;

export const Index = ({ name }) => {
    const navigate = useNavigate();
    const logsApi = logsRequest();
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    const styles = {
        link: {
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.54)",
        },
        fontBold: {
            fontWeightBold: 'bold'
        }
    };
    const columns = [
        {
            name: "#",
            selector: (row) => [row.id],
            sortable: true,
            width: "80px"
        },
        {
            name: "Usuário",
            selector: (row) => [row.get_user?.name],
            sortable: true,
        },
        {
            name: "IP",
            selector: (row) => [row.ip],
            sortable: true,
        },
        {
            name: "Data Login",
            selector: (row) => [datetimeBr(row.created_at)],
            sortable: true,
        },

    ];

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getLogs, 1000);
    }, [search]);

    const getLogs = async (page = 1) => {
        const result = await logsApi.getLogs(
            { page, per_page: perPage, search }
        );
        if (result.error) {
            navigate('/');
            Swal.fire(result.error);
        } else {
            setLogs(result.logs.data);
        }
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Registros por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const data = [...logs];


    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/" style={styles.link}>
                    Página inicial
                </Link>
                <Link
                    underline="hover"
                    color="text.primary"
                    href="/material-ui/react-breadcrumbs/"
                    aria-current="page"
                    style={styles.link}
                >
                    {name}
                </Link>
            </Breadcrumbs>
            <Box sx={{ mt: 5 }}>
                <TextField                   
                    size="small"
                    name="search"
                    label="Pesquisar"
                    type="texst"
                    id="search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <DataTable title="Logs" columns={columns} data={data} noHeader defaultSortField="id"
                    pagination
                    paginationServer
                    paginationComponentOptions={paginationComponentOptions}

                    defaultSortAsc={false}
                    center={true}
                    persistTableHead
                    highlightOnHover
                    noDataComponent="Não foi encontrado nenhum registro"
                />
            </Box>
        </Fragment>);
}

export default Index;