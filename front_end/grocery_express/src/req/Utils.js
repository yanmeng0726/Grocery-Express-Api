import {deleteRequest, getRequest, postRequest, putRequest} from './req'

const debug = false;
const location = debug? 'http://localhost:8080': 'http://ec2-3-129-80-130.us-east-2.compute.amazonaws.com:8080'
export function getStores(token) {
    return getRequest(`${location}/stores`, {}, token);
}

export function getCustomers(token) {
    return getRequest( `${location}/users`, {}, token);
}

export function getItemsofStore(storeId,token){
    return getRequest(`${location}/stores/${storeId}/items`,{},token);
}

export function addStore(storeName, token){
    return postRequest(`${location}/stores`, { name: storeName}, token)
}

export function addItemToStore(storeId, itemName, itemWeight, itemPrice, token){
    return postRequest(`${location}/stores/${storeId}/items`, 
    { name: itemName ,
      unit_price: itemPrice,
      weight: itemWeight},token)
}

export function addDroneToStore(storeId, weightlimit, token){
    return postRequest(`${location}/stores/${storeId}/drones`, 
    {
        weight_limit : weightlimit,
	    trips_left : 20,
	    status: 2},token)
}

/*{
  "first_name": "lkaaaaaakl",
  "last_name": "H",
  "phone": "951-8a92-",
  "ssn": "0032-da43",
  "license_id": "se4asd",
  "experience": 2,
  "expiration_date": "01-01-1990",
  "is_free": true
}*/

export function addPilotToStore( storeId, fn, ln, phone,ssn,license,experience, expiration, token){
 return postRequest(`${location}/stores/${storeId}/employees`,
  {
    first_name: fn,
    last_name: ln,
    phone: phone,
    ssn : ssn,
    license_id: license,
    experience: experience,
    expiration_date: expiration,
    is_free:true
  },
  token
 )
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
    is_manager: false
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

export function addLinesToOrder(storeId, orderId, items, token ){
    return postRequest(`${location}/stores/${storeId}/orders/${orderId}/lines`,
       {
           lines:items
       }
    ,token)
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
