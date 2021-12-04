import React  from  'react'

export const initData = {
   setStoreData: ()=>{}, 
   user:{}
}

export const StoreContext = React.createContext(initData);
export const StoreContextProvider =StoreContext.Provider;
export const StoreContextConsumer = StoreContext.Consumer;