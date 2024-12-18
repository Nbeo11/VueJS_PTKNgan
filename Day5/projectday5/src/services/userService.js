import {get, del, post} from './service.js';

function getUsers() {
    return get('user')
}

function addUser(data) {
    return post('users', data)
}

export const userService = {
    getUsers,
    addUser,
}