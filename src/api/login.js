import request from './request'

const imgCode = '/admin/login/imgCode'

function doLogin (data){
    return request ({
        url: '/admin/login/doLogin',
        method: 'post',
        data
    })
}

function getUserInfo(data){
    return request ({
        url: '/admin/login/getUserInfo',
        method: 'get',
        data
    })
}


export default{
    doLogin,
    imgCode,
    getUserInfo
}