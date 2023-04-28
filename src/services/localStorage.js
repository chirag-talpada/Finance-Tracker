export function addData(key,data){
    localStorage.setItem('abc',data);
}

export function getData(key){
    return localStorage.getItem('abc');
}