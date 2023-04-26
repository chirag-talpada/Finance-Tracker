export function addData(key,data){
    localStorage.setItem(key,data);
}

export function getData(key){
    return localStorage.getItem(key);
}