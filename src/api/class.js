import request from './request'

export function getClasstList (data){
    return request ({
        url: '/admin/xy/clazz/list',
        method: 'get',
        data
    })
}

export function addClasstList (data){
    return request ({
        url: '/admin/xy/clazz/save',
        method: 'post',
        data
    })
}

export function upDataClasstList (data){
    return request ({
        url: '/admin/xy/clazz/update',
        method: 'post',
        data
    })
}

export function getClasstDetail (data){
    return request ({
        url: '/admin/xy/clazz/detail',
        method: 'get',
        data
    })
}

export function removeClassList (data){
    return request ({
        url: '/admin/xy/clazz/del',
        method: 'get',
        data
    })
}
