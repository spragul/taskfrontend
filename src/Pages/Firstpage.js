import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Firstpage() {
    const navigate =useNavigate();
    const token =sessionStorage.getItem('token')
    useEffect(()=>{
     if(token){
        navigate('/dashboard')
     }else{
        navigate('/login');
     }
    },[])
  return (
    <div>Frstpage</div>
  )
}

export default Firstpage