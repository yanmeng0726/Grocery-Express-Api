import {deleteRequest, getRequest, postRequest, putRequest} from './req'

const debug = true;
const location = debug? 'http://localhost:8080': 'http://ec2-3-129-80-130.us-east-2.compute.amazonaws.com:8080'
export function getStores(token) {
    return getRequest(`${location}/stores`, {}, token);
}

export function getItemsofStore(storeId,token){
    return getRequest(`${location}/stores/${storeId}/items`,{},token);
}

export function addStore(storeName, token){
    return postRequest(`${location}/stores`, { name: storeName})
}

export function addItemToStore(storeId, itemName, itemWeight, itemPrice, token){
    return postRequest(`${location}/stores/${storeId}/items`, 
    { name: itemName ,
      unit_price: itemPrice,
      weight: itemWeight})
}

export function logIn( userName, password) {
   return postRequest( `${location}/api/auth/signin`, {
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
    return postRequest(`${location}/api/auth/signup`,{
    name: name,
    email: email,
    phone: phone,
    username: firstName+" "+lastName,
    password: psw,
    address: addr,
    customer_rating: rating,
    credits: credits,
    is_manager: true
    },"")
}

export function getMaxLoadDrone(storeId, token){
   return getRequest(`${location}/stores/${storeId}/maxWeight`,{},token)
}

export function startaNewOrder(storeId, totalPrice, totalWeight, userId, token){
    return postRequest(`${location}/stores/${storeId}/orders`,{
        store_id: storeId,
        total_cost: totalPrice,
        total_weight: totalWeight,
        order_status: 1,
        user_id:userId
    },token)
}

export function cancelOrder(storeId, orderId, token){
    return deleteRequest(`${location}/stores/${storeId}/orders/${orderId}`,token)
}

export function getUserOrders(userId,token){
    return getRequest(`${location}/users/${userId}/orders`,{},token)
}

export function getOrdersOfStore(storeId,token){
    return getRequest(`${location}/stores/${storeId}/orders`,{},token);
}

/*
    "store_id": 1,
    "drone_id": 1,
    "employee_id": 5,
    "total_cost": 100.27,
    "total_weight": 30.26,
    "order_status": 3,
    "user_id": 2
*/

export function assignOrder(storeId,orderId,pilotId,droneId,token){
    return putRequest(`${location}/stores/${storeId}/orders/${orderId}`,{
      drone_id:droneId,
      employee_id:pilotId,
      order_status:2,
    },token)
}
