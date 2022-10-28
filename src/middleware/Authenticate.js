import React from 'react';
import { Navigate } from 'react-router-dom';
import useApi from '../services/Api/auth';

export const PrivateRoute = ({ children }) => {
    const api = useApi();

    if(api.isAuthenticated()){
        return children;
    }
    return <Navigate to="/login"/>;
}

export const NotPrivateRoute = ({ children }) => {
    const api = useApi();

    if(!api.isAuthenticated()){
        return children;
    }

    return <Navigate to="/"/>;
}
