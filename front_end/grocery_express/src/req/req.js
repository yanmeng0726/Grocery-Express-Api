export function getRequest(url, headers){
 return new Promise((resolve,reject) =>{
    const req = new XMLHttpRequest();
    req.open('GET', url , true);
    req.setRequestHeader('Content-Type', 'appilication/json;charset-UTF-8');
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    req.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.send();
 });
}