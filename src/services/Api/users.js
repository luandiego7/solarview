import {getToken, request} from './base';

export default () => {
    return{
        getUsers: async (data) => {
            return await request('get', '/users', data);
        },
        getUser: async (id) => {
            return await request('get', '/users/'+id, {});
        },
        create: async (data) => {
            return await request('post', '/users/', data);
        },
        update: async (id, data) => {
            return await request('put', '/users/'+id, data);
        },
        delete: async (id) => {
            return await request('delete', '/users/'+id, {});
        },
    }
}