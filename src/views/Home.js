
import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import UserIcon from '@mui/icons-material/Person';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { logsRequest } from '../services/Api';
import {datetimeBr} from '../services/Helpers/format';

function DashboardContent() {
    const logsApi = logsRequest();
    const [chart, setChart] = React.useState([]);
    const [lastLogs, setLastLogs] = React.useState({});
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        const getDashboard = async () => {
            const result = await logsApi.dashboard();
            setChart(result.chart);
            setLastLogs(result.last_logs);
            setTotal(parseInt(result.total))
        }
        getDashboard();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>                
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Chart chart={chart} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <React.Fragment>
                            <Box sx={{ display: 'flex' }}>
                                <UserIcon style={{ color: 'blue' }} />
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Usuários
                                </Typography>
                            </Box>
                            <Typography component="p" variant="h4">
                                {total}
                            </Typography>
                        </React.Fragment>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <React.Fragment>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Últimos acessos
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Usuário</TableCell>
                                        <TableCell>IP</TableCell>
                                        <TableCell>Data</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(lastLogs).length > 0 && lastLogs.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.get_user.name}</TableCell>
                                            <TableCell>{row.ip}</TableCell>
                                            <TableCell>{datetimeBr(row.created_at)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Link to="/logs" sx={{ mt: 3 }}>
                                Veja mais...
                            </Link>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
