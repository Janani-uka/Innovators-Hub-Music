import React, { useContext } from 'react'
import { UserContextAPI } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const AdminRoutes = (props) => {
    let {userProfile}=useContext(UserContextAPI)

    if(userProfile?.role === "admin"){
        return props.children
  
    }else{
        return <Navigate to="/"/>
    }
}

export default AdminRoutes