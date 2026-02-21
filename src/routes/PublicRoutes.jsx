import React, { useContext } from 'react'
import { AuthContextAPI } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PublicRoutes = (props) => {
  let {authUser}=useContext(AuthContextAPI)

  if(authUser){
return <Navigate to="/"/>
  }else{
    return props.children
  }
}

export default PublicRoutes