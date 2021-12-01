import {getRequest, postRequest} from './req'

export function getStores() {
    return getRequest('http://localhost:8080/stores');
}

export function addStore(storeName){
    return postRequest('http://localhost:8080/stores', { name: storeName})
}