
export function postRequest(url ,data, token){
   //get user info from store
   let send =JSON.stringify(data);
   return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.responseType = 'json'
      req.open('POST', url, true);
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      req.setRequestHeader('Accept', 'application/json');
      req.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaHV5aW5nbEBnbWFpbC5jb20iLCJpYXQiOjE2Mzg1NzEwMjUsImV4cCI6MTYzOTE3NTgyNX0.-EhV8-eYPsWH1PByzE1lJbmlNJtZwnsFgpMdJ1A4WBRXc5mRmcBGTJ0V8hgX068ufLPLHsk952iPbkEqK0kd7Q')
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


export function getRequest(url, headers, token){
 return new Promise((resolve,reject) =>{
    headers = headers || {}; 
    const req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url , true);
    req.setRequestHeader('Content-Type', 'appilication/json;charset-UTF-8');
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Authorization', `Bearer ${token}`)
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