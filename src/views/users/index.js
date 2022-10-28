import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { usersRequest } from '../../services/Api';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';

let timer;

export const Index = ({ name }) => {
    const navigate = useNavigate();
    const usersApi = usersRequest();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    const handleCreate = () => {
        navigate('/users/create')
    }

    const handleDelete = async (id, name) => {
        Swal.fire({
            text: `Deseja realmente excluir ${name} ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#dc3545'
        }).then((result) => {
            const deleteUser = async (id) => {
                const result = await usersApi.delete(id);

                if (result.error !== "") {
                    Swal.fire({ text: result.error, icon: 'error' });
                } else {
                    Swal.fire({ text: result.message, icon: 'success' });
                }
            }
            if (result.value) {
                deleteUser(id);
                getUsers();
            }
        });
    }

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
            name: "Nome",
            selector: (row) => [row.name],
            sortable: true,
        },
        {
            name: "E-mail",
            selector: (row) => [row.email],
            sortable: true,
        },
        {
            name: "Ações",
            selector: (row) => {
                return (
                    <ButtonGroup size="small" color="primary" aria-label="medium secondary button group">
                        <Button component={Link} to={`/users/update/${row.id}`} key="edit" title="Editar"><EditIcon /></Button>
                        <Button key="delete" color="error" title="Excluir" onClick={() => handleDelete(row.id, row.name)}><DeleteForeverIcon /></Button>
                    </ButtonGroup>
                );
            },
            sortable: true,
            center:true
        },

    ];

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getUsers, 1000);
    }, [search]);

    const getUsers = async (page = 1) => {
        const result = await usersApi.getUsers(
            { page, per_page: perPage, search }
        );
        if (result.error) {
            navigate('/');
            Swal.fire(result.error);
        } else {
            setUsers(result.users.data);
        }
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Registros por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const data = [...users];


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
                <Button variant="contained" color="success" onClick={() => handleCreate()}>
                    Cadastrar
                </Button>
            </Box>
            <Box sx={{ mt: 5 }}>
                <TextField
                    size="small"
                    name="search"
                    label="Pesquisar"
                    type="texst"
                    id="search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <DataTable title="Usuários" columns={columns} data={data} noHeader defaultSortField="id"
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