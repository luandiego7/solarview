import {getToken, request} from './base';

export default () => {
    return{
        login: async (data) => {
            return await request('post', '/auth/login', data);
        },
        register: async (data) => {
            return await request('post', '/auth/register', data);
        },
        isAuthenticated: () => {
            return !!getToken();
        },
        validateLogin: async () => {
            return await request('post', '/auth/refresh', {});
        },
        logout: async () => {
            return await request('post', '/auth/logout', {});
        },
        getUser: async () => {
            return await request('get', '/users/user', {});
        },
        getUserPermissions: async () => {
            return await request('get', '/permissions/user', {});
        },
        sendEmailReset: async (data) => {
            return await request('post', '/auth/send-email-reset-password', data);
        },
        getResetPassword: async (data) => {
            return await request('get', '/auth/reset-password', data);
        },
        resetPassword: async (data) => {
            return await request('post', '/auth/reset-password', data);
        },
    }
}