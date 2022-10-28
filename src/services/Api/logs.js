import { getToken, request } from './base';

export default () => {
    return {
        dashboard: async () => {
            return await request('get', '/logs/dashboard', {});
        },
        getLogs: async (data) => {
            return await request('get', '/logs', data);
        },
    }
}