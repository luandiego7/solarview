
import * as React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authRequest } from '../../services/Api';
import { setUser } from "../../reducers/UserReducer";
import Swal from 'sweetalert2';

const theme = createTheme();

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail não é um e-mail válido').required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatório').min(8, 'Senha deve ter no mínimo 8 dígitos'),
    confirm_password: yup.string().required('Senha de confirmação é obrigatório').oneOf([yup.ref('password'), null], 'Senha de confirmação deve ser igual'),
});

const Register = () => {
    const authApi = authRequest();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        const result = await authApi.register(values);

        if (result.error !== '') {
            Swal.fire({ text: result.error, icon: 'error' });
            return false;
        } else {
            dispatch(setUser(result.user));
            localStorage.setItem('token', result.token);

            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid >
                            <Grid item xs>
                                <img
                                    src={require("../../assets/images/logo.png")}
                                    alt="logo"
                                />
                            </Grid>
                        </Grid>
                        {/* <Box component="form" sx={{ mt: 1 }}> */}
                        <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={{ email: "", password: "", }}>
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                errors, }) => (
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-start mb-2">Cadastre-se</h3>
                                    <TextField
                                        onChange={handleChange}
                                        margin="normal"
                                        fullWidth
                                        id="name"
                                        label="Nome"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        error={errors.name && Boolean(errors.name)}
                                        helperText={errors.name}
                                    />
                                    <TextField
                                        onChange={handleChange}
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="E-mail"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={errors.email && Boolean(errors.email)}
                                        helperText={errors.email}
                                    />

                                    <TextField
                                        onChange={handleChange}
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={errors.password && Boolean(errors.password)}
                                        helperText={errors.password}
                                    />
                                    <TextField
                                        onChange={handleChange}
                                        margin="normal"
                                        fullWidth
                                        name="confirm_password"
                                        label="Repita a senha"
                                        type="password"
                                        id="confirm_password"
                                        autoComplete="current-password"
                                        error={errors.confirm_password && Boolean(errors.confirm_password)}
                                        helperText={errors.confirm_password}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Cadastrar
                                    </Button>
                                </form>
                            )}
                        </Formik>

                        <Grid container>
                            <Grid item xs>
                                <Link to="/login" variant="body2">
                                    Lembrou a senha? Tente logar
                                </Link>
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Register;