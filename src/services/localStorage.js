export function addData(key,data){
    localStorage.setItem(key,data);
}

export function getData(key){
    return localStorage.getItem(key);
}

export function saveUser(data){
    let prevData=getUserData();

    if(!localStorage.getItem('users')){
        prevData=[];
    }
    prevData.push(data);
    localStorage.setItem('users',JSON.stringify(prevData));
}

export function getUserData(){
    return JSON.parse(localStorage.getItem('users'));
}

export function getUsersID(){
    let Userdata=getUserData();
    if(Userdata){
        return Userdata.length+1;
    }else{
        return 1;
    }
}