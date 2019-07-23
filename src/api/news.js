import request from './request'

export function getNewsList (data){
    return request ({
        url: '/admin/xy/news/list',
        method: 'get',
        data
    })
}

export function addNewsList (data){
    return request ({
        url: '/admin/xy/news/save',
        method: 'post',
        data
    })
}

export function changeNewsList (data){
    return request ({
        url: '/admin/xy/news/update',
        method: 'post',
        data
    })
}

export function newsDetail (data){
    return request ({
        url: '/admin/xy/news/detail',
        method: 'get',
        data
    })
}

export function delNewsList (data){
    return request ({
        url: '/admin/xy/news/del',
        method: 'get',
        data
    })
}