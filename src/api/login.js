import {
    post
} from '@/common/request'


export function login(account, password) {
    return post('admin/login', {
        Account: account,
        Password: password
    })
}