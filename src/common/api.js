import axios from 'axios';

const URLS = {
    'studyCategory': '/api/study/category/',
    'studyList': '/api/study/content/',
    'studyDetail': '/api/study/detail/',
    'studyRecord': '/api/study/record/',
    'idCardInfo': '/api/party/idcardinfo',
    'cashMonth': '/api/party/yearpay/',
    'userInfo': '/api/user/',
    'devLogin': '/wx/login/',
    'devUser': '/client/1',
    'party': '/api/party/org/',
    'getBindCode': '/api/user/regcode/',
    'bindParty': '/api/user/bind/',
    'userMatrix': '/api/user/matrix/'
    
};

const commonConfig = {
    validateStatus: function (status) {
        return status >= 200 && status <= 500; 
    }
};

function fetchData(action, data, method, opt) {
    if(!Object.keys(URLS).includes(action)) {
        let err = new Error('无效的api地址');
        return Promise.reject(err);
    }
    const path = URLS[action];
    method = method ? method : 'get';
    const curMethod = method.toLocaleLowerCase();
    let curReq = null;
    switch(curMethod) {
    case 'post':
        curReq = axios.post(path, data, Object.assign({}, commonConfig, opt));
        break;
    case 'get':
    default:
        curReq = axios.get(path, Object.assign({}, commonConfig, {
            params: data
        }, opt));
    }
    return curReq.then(function(res) {
        console.log(res);
        if(res.data.code === 0) {
            return Promise.resolve(res.data);
        }else {
            let err = new Error(res.data.msg);
            return Promise.reject(err);
        }
    });
}

export default fetchData;