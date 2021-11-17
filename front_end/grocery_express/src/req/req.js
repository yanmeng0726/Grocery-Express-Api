export function getRequest(url, headers){
 let  = JSON.stringify(data);
 return new Promise((resolve,reject) =>{
   headers =headers ||{};
   let req = new XMLHttpRequest();
   req.responseType = ' json';
   req.open('GET', url , true);
   req.setRequestHeader('Content-Type', 'appilication/json;charset-UTF-8');
   req.setRequestHeaderHeader('Accept', 'application/json');
   const moreHeaders =Object.keys(headers);
   moreHeaders.forEach((key) => {req.setRequestHeader(key, headers[key])});
   req.onload = (r) =>{
       if(req.response && req.response.code === 460){
           window.location.reload();
           return;
       }
       if(r.target.status >= 400) {
        const message = r.target.response  && r.target.response.error&& r.target.response.error.message;
        reject(new Error(r.target.status+ ' - ' + message));
      }
      else{
        resolve(req.response);
      }
   };
   req.onerror =(e) =>{reject(e);};
   req.send();
 });
}