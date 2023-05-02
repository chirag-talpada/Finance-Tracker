import { getUserData } from "./localStorage";

export const isAuthenticated=(email,password)=>{
    let userData=getUserData();

    for (const data of userData) {
        if(data.email===email && data.password===password){
            storeToken(data.id);
            return true;
        }
    }

    return false;

}

const storeToken=(id)=>{
    let token=`sjbsnjdfbebfiefeifowhf,${id},asjhsjkcvbjkscbscjkbjsckbjsc`;
    localStorage.setItem('token',token);
}

export const getUserID=()=>{
    let token=localStorage.getItem('token');
    let tokenID=Number(token.split(',')[1]);
    return tokenID;
}

const hasUser=(id)=>{
    let userData=getUserData();

    for (const data of userData) {
        if(data.id===id){
            return true;
        }
    }

    return false;
}

export const verifyToken=()=>{
    let token=localStorage.getItem('token');
    if(token){
        let tokenID=token.split(',')[1];
        if(tokenID){
            return hasUser(Number(tokenID))
        }else{
            return false;
        }
    }else{
        return false
    }
    
}

export const isAlreadyLoggedIn=()=>{
    let token=localStorage.getItem('token');
    if(token){
       return true;
    }
    return false;
}

export const loggedout=()=>{
    localStorage.removeItem('token');
}