//const BASE_URL = 'http://localhost/solarview_back/api';
const BASE_URL = 'http://127.0.0.1:8000/api';
const request = async (method, endpoint, params) => {
    method    = method.toLowerCase();
    let url   = `${BASE_URL}${endpoint}`;
    let body  = null;
    let token = getToken();

    switch(method){
        case 'get':{
            let queryString = new URLSearchParams(params).toString();
            if(queryString){
                url += `?${queryString}&token=${token}`;
            }else{
                url += `?token=${token}`;
            }
            break;
        }
        case 'post':
        case 'put':
        case 'delete':{
            params = {...params, token};
            body = JSON.stringify(params);
            break;
        }
        default:{
            break;
        }
    }
    let headers = {Accept: 'application/json', 'Content-Type': 'application/json'};
    let result  = await fetch(url, {method, headers, body});
    return await result.json();
}

const getToken = () => {
    return localStorage.getItem('token');
}

const requestFile = async (endpoint, data) => {

    const res = await fetch(BASE_URL+endpoint+'?token='+getToken(), {
        method:'POST',
        body:data
    });

    return await res.json();
}

export { request, requestFile, getToken }
