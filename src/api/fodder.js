import request from './request'

export function getFodderList (data){
    return request ({
        url: '/admin/xy/upload/list',
        method: 'get',
        data
    })
}

export function updateTitle (data){
    return request ({
        url: '/admin/xy/upload/updateTitle',
        method: 'post',
        data
    })
}

export function delFodder (data){
    return request ({
        url: '/admin/xy/upload/del',
        method: 'get',
        data
    })
}