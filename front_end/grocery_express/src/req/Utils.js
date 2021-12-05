import {deleteRequest, getRequest, postRequest} from './req'


export function getStores(token) {
    return getRequest('http://localhost:8080/stores', {}, token);
}

export function getItemsofStore(storeId,token){
    return getRequest(`http://localhost:8080/stores/${storeId}/items`,{},token);
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

export function logIn( userName, password) {
   return postRequest( 'http://localhost:8080/api/auth/signin', {
       usernameOrEmail : userName,
       password: password
   })
}

/*{
  "name": "chuchuz",
  "email": "chuyingl.lll",
  "phone": "951-892-0434",
  "username": "chuyingl@ggg.com",
  "password": "string",
  "address": "california",
  "customer_rating": 5,
  "credits": 1255,
  "is_manager":false
*/
export function register (name, email,phone,firstName, lastName, psw, addr, rating, credits, isManager, token){
    return postRequest('http://localhost:8080/api/auth/signup',{
    name: name,
    email: email,
    phone: phone,
    username: firstName+" "+lastName,
    password: psw,
    address: addr,
    customer_rating: rating,
    credits: credits,
    is_manager: isManager
    },"")
}

export function getMaxLoadDrone(storeId, token){
   return getRequest(`http://localhost:8080/stores/${storeId}/maxWeight`,{},token)
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

export function cancelOrder(storeId, orderId, token){
    return deleteRequest(`http://localhost:8080/stores/${storeId}/orders/${orderId}`,token)
}

export function getUserOrders(userId,token){
    return getRequest(`http://localhost:8080/users/${userId}/orders`,{},token)
}
