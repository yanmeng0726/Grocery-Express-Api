import { useContext } from "react";
import { Navigate } from "react-router";
import { StoreContext } from "../StoreContext";
import { useLocation } from "react-router";
import * as Crypto from 'crypto-js'


const decryptInfo = (encodedString, session)=>{
  var bytes = Crypto.AES.decrypt(encodedString, session)
  var decryptedData =JSON.parse(bytes.toString(Crypto.enc.Utf8));
  return decryptedData;
}

export function RequireAuth({children}){
  const context = useContext(StoreContext);
  const location = useLocation();
  var loggedin = false;

  const loggedInUser = localStorage.getItem("user");
    const token =  localStorage.getItem("token");
    if(loggedInUser && token){
      const userData = decryptInfo(loggedInUser, token);
      if(userData.user_id){
        loggedin =true
      }
    }
  return loggedin === true 
    ? children 
    : <Navigate to="/login" replace />;
}