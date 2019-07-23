import request from './request'

export function getStudentList (data){
    return request ({
        url: '/admin/xy/student/list',
        method: 'get',
        data
    })
}

export function getDormList (data){
    return request({
        url: '/admin/xy/dorm/list',
        method: 'get',
        data
    })
}

export function getClassList (data){
    return request({
        url: '/admin/xy/clazz/list',
        method: 'get',
        data
    })
}

export function saveStudentInfo (data){
    return request({
        url: '/admin/xy/student/save',
        method: 'post',
        data
    })
}

export function removeStudentInfo (data){
    return request({
        url: '/admin/xy/student/del',
        method: 'get',
        data
    })
}

export function getStudentDetail (data){
    return request({
        url: '/admin/xy/student/detail',
        method: 'get',
        data
    })
}

export function upDataStudent (data){
    return request({
        url: '/admin/xy/student/update',
        method: 'post',
        data
    })
}

export function getStudentCost (data){
    return request({
        url: '/admin/xy/cost/list',
        method: 'get',
        data
    })
}
