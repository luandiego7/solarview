import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik } from "formik";
import * as yup from "yup";
import { usersRequest } from '../../services/Api';
import Swal from 'sweetalert2';

const UsersForm = () => {
    const { id } = useParams();
    const usersApi = usersRequest();
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const isNew = () => { return !id };

    useEffect(() => {
        const loadPage = async () => {
            if (!isNew()) {
                const result = await usersApi.getUser(id);
                if (result.error) {
                    navigate('/');
                    Swal.fire({ icon: 'error', text: result.error });
                }
                setUser(result.user);
                var form = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        }
        loadPage();
    }, []);


    const schema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('E-mail não é um e-mail válido').required('E-mail é obrigatório'),
    });

    var form = {
        id: user.id ? user.id : '',
        name: user.name ? user.name : '',
        email: user.email ? user.email : '',
    };

    const handleVoltar = () => {
        navigate('/users');
    }

    const handleSubmit = async (values) => {
        if (!isNew()) {
            var result = await usersApi.update(id, values);
        } else {
            var result = await usersApi.create(values);
        }

        if (result.error !== '') {
            Swal.fire({ text: result.error, icon: 'error' });
            return false;
        } else {
            Swal.fire({ text: result.message, icon: 'success' });
            setTimeout(() => {
                navigate('/users');
            }, 1000);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={() => handleVoltar()}>Voltar</Button>
            <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={form} enableReinitialize={true}>
                {({
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    values,
                    touched,
                    errors, }) => (
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-start mb-2">{isNew ? 'Novo usuário' : 'Editando: ' + values.name}</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={handleChange}
                                    value={values.name}
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    error={errors.name && Boolean(errors.name)}
                                    helperText={errors.name}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={handleChange}
                                    value={values.email}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    name="email"
                                    error={errors.email && Boolean(errors.email)}
                                    helperText={errors.email}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik >
        </div>
    );
}

export default UsersForm;