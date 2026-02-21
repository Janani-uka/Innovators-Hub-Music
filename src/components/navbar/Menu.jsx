import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PageNotFound from '../../pages/PageNotFound'
import { AuthContextAPI } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { __AUTH } from '../../backend/FirebaseConfig'
import { UserContextAPI } from '../../context/UserContext'
import Spinner from '../../helpers/Spinner'

const Menu = () => {
  let {authUser}= useContext(AuthContextAPI)
   let {userProfile,isloading}=useContext(UserContextAPI)
  let navigate=useNavigate()

  const logout=async()=>{
    try{
      await signOut(__AUTH)
      toast.success("Logged out")
      navigate("/auth/login")
    }catch(error){
      toast.error(error.message)
    }
    
  }
  return (
    <aside>
        <ul className='flex gap-3 font-semibold items-center'>
        {userProfile?.role==="admin"  && authUser&& <li ><NavLink to="/admin" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}
            >Admin</NavLink></li>}
            <li ><NavLink to="/" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}
            >Home</NavLink></li>
           {authUser? <><button  className= "py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800" onClick={logout}>Logout</button>
           <li><NavLink to="/user-profile"><img src={authUser.photoURL} alt=""className='h-[30px] w-[30px] rounded-full' /></NavLink></li>
           </>:<>
            <li ><NavLink to="/auth/login" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}>Login</NavLink></li>
            <li><NavLink to="/auth/register" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}>Register</NavLink></li></>}
           
        </ul>
        {isloading && <Spinner/>}
    </aside>
  )
}

export default Menu                                    