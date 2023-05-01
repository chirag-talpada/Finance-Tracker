import React,{useEffect} from 'react'
import { verifyToken } from '../services/authentication'
import { useNavigate } from 'react-router-dom'

const AuthGuard = ({Component}) => {

    const navigate=useNavigate();

    useEffect(()=>{
        if(!verifyToken()){
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  return (
    <Component/>
  )
}

export default AuthGuard