import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotPrivateRoute, PrivateRoute } from "./middleware/Authenticate";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


// layouts
const NotPrivateLayout = React.lazy(() => import("./layout/NotPrivate"));
const Layout           = React.lazy(() => import("./layout/Layout"));


// Pages
const Login       = React.lazy(() => import('./views/auth/Login'));
const Register    = React.lazy(() => import('./views/auth/Register'));
const Home        = React.lazy(() => import('./views/Home'));
const Logs        = React.lazy(() => import('./views/logs'));
const Users       = React.lazy(() => import('./views/users'));
const UsersCreate = React.lazy(() => import('./views/users/Form'));
const UsersUpdate = React.lazy(() => import('./views/users/Form'));
const NotFound    = React.lazy(() => import('./views/NotFound'));

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Suspense fallback={<div>Carregando...</div>}>
                        <Routes>
                            <Route path={`/`} element={<PrivateRoute><Layout /></PrivateRoute>}>
                                <Route index path="/" name="Home" element={<Home/>} />
                                <Route path="/home" name="Home" element={<Home name="Página inicial" />} />
                                <Route path="/logs" name="Logs" element={<Logs name="Logs" />} />
                                <Route path="/users" name="Users" element={<Users name="Usuários" />} />
                                <Route path="/users/create" name="Users Create" element={<UsersCreate name="Criar usuário" />} />
                                <Route path="/users/update/:id" name="Users Update" element={<UsersUpdate name="Editar usuário" />} />
                            </Route>
                            <Route path={`/`} element={<NotPrivateRoute><NotPrivateLayout /></NotPrivateRoute>}>
                                <Route path={`/login`} name="Login" element={<Login name="Login" />} />
                                <Route path={`/register`} name="Register" element={<Register name="Register" />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
