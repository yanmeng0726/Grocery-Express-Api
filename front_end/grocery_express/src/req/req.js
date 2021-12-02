
export function postRequest(url ,data){
   let send =JSON.stringify(data);
   return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.responseType = 'json'
      req.open('POST', url, true);
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      req.setRequestHeader('Accept', 'application/json');
      req.onload= (r) =>{
         console.log(r.target.status)
         if(req.response && req.response.code === 460){
            window.location.reload();
            return;
         }
         if(r.target.status >= 400){
            const message = 
            r.target.response && 
            r.target.response.error&&r.target.response.error.message;
            reject(new Error(r.target.status+ '-' +message));
         }
         else{
            resolve(req.response); 
         }
      };
      req.onerror = (e) => {
        reject(e);
      };
      req.send(send);
   }); 
}


export function getRequest(url, headers){
 return new Promise((resolve,reject) =>{
    headers = headers || {}; 
    const req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url , true);
    req.setRequestHeader('Content-Type', 'appilication/json;charset-UTF-8');
    req.setRequestHeader('Accept', 'application/json');
    //handle more headers
    const moreHeaders = Object.keys(headers);
    moreHeaders.forEach((key) => {req.setRequestHeader(key, headers[key])});
    req.onload = (r) => {
       if(req.response && req.response.code === 460){
          window.location.reload();
          return;
       }
       if(r.target.status >= 400){
         const message =
           r.target.response &&
           r.target.response.error &&
           r.target.response.error.message;
           reject(new Error (r.target.status + ' - ' +message));
       }else{
          resolve(req.response);
       }
    };
    req.onerror = (e) => {
      reject(e);
    };
    req.send();
 });
}