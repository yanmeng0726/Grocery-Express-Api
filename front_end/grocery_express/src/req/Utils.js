import {getRequest, postRequest} from './req'


export function getStores(token) {
    return getRequest('http://localhost:8080/stores');
}

export function getItemsofStore(storeId, token){
    return getRequest(`http://localhost:8080/stores/${storeId}/items`,token);
}

export function addStore(storeName, token){
    return postRequest('http://localhost:8080/stores', { name: storeName})
}

export function addItemToStore(storeId, itemName, itemWeight, itemPrice, token){
    return postRequest(`http://localhost:8080/stores/${storeId}/items`, 
    { name: itemName ,
      unit_price: itemPrice,
      weight: itemWeight})
}

export function logIn( userName, password, token) {
   return postRequest( 'http://localhost:8080/api/auth/signin', {
       usernameOrEmail : userName,
       password: password
   })  
}

export function getMaxLoadDrone(storeId, token){
   return getRequest(`http://localhost:8080/stores/${storeId}/maxWeight`)
}

export function startaNewOrder(storeId, totalPrice, totalWeight, userId, token){
    return postRequest(`http://localhost:8080/stores/${storeId}/orders`,{
        store_id: storeId,
        total_cost: totalPrice,
        total_weight: totalWeight,
        order_status: 1,
        user_id:userId
    },token)
}
