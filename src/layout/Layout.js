
import { Outlet, Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import FileOpen from '@mui/icons-material/FileOpen';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import UserIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import { authRequest } from "../services/Api";

const drawerWidth = 240;

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "rgba(0, 0, 0, 0.54)",
    },
    listItemText: {
        marginLeft: '-15px',
        paddingTop: '10px'
    },
    textDanger: {
        color: 'red'
    }
});


const Layout = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const styles = useStyles();
    const authApi = authRequest();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        await authApi.logout();

        localStorage.removeItem('token');
        localStorage.removeItem('persist:root');

        setTimeout(() => {
            navigate('/login');
        }, 500);
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
            <Link to="/" className={styles.link}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} className={styles.listItemText} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/logs" className={styles.link}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FileOpen />
                            </ListItemIcon>
                            <ListItemText primary={"Logs"} className={styles.listItemText} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/users" className={styles.link}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <UserIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Usuários"} className={styles.listItemText} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem disablePadding className={styles.textDanger} onClick={handleLogout}>
                    <ListItemButton >
                        <ListItemIcon>
                            <Logout style={{ color: 'red' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Sair"} className={styles.listItemText} />
                    </ListItemButton>
                </ListItem>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};
export default Layout;
