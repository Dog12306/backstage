const TokenKey = 'student'
import request from './request'

export function getToken (){
    var res = localStorage.getItem(TokenKey);
    console.log("getToken",res);
    if(res){
        res = JSON.parse(res);
    }else{
        res = undefined;
    }
    return res;
}

export function setToken(obj){
    localStorage.setItem(TokenKey,JSON.stringify(obj));
}

export function removeToken(data){
    localStorage.removeItem(TokenKey);
    console.log("aaa",localStorage);
    return request ({
        url: '/admin/login/doLogOut',
        method: 'get',
        data
    })
}