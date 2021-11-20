import {getRequest} from './req'

export function getStores() {
    return getRequest('http://localhost:8080/stores');
}