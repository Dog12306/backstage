import request from './request'

export function getDormList (data){
    return request ({
        url: '/admin/xy/dorm/list',
        method: 'get',
        data
    })
}

export function addDormList (data){
    return request ({
        url: '/admin/xy/dorm/save',
        method: 'post',
        data
    })
}

export function addDormDetail (data){
    return request ({
        url: '/admin/xy/dorm/detail',
        method: 'get',
        data
    })
}

export function updataDormList (data){
    return request ({
        url: '/admin/xy/dorm/update',
        method: 'post',
        data
    })
}

export function removeDormList (data){
    return request ({
        url: '/admin/xy/dorm/del',
        method: 'get',
        data
    })
}