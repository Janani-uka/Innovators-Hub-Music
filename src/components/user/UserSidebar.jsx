import React from 'react'
import { AiFillPicture } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { MdDelete, MdSwitchAccount } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <div className='h-[100%] w-[20%] bg-slate-600 py-12 px-4 shrink-0 '>
        <ul className='flex flex-col gap-5 '>
        
            <li>
                <NavLink to="/user-profile" end className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg font-semibold text-lg flex gap-2 items-center w-[100%] px cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}><span><MdSwitchAccount /></span>My Account</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/update-picture" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg font-semibold flex gap-2 text-lg items-center w-[100%] px cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}><span><AiFillPicture/>
                </span>Update Picture </NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/update-profile" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg font-semibold flex gap-2 items-center text-lg w-[100%] px cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}><span><ImProfile/></span>Update Profile</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/update-password" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg font-semibold flex gap-2 
              items-center w-[100%] text-lg px cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
            }}><span><RiLockPasswordFill/></span>Update Password</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/delete-user" className={(obj)=>{
              let {isActive}=obj
              return ` py-2 px-4 rounded-lg font-semibold flex gap-2 
              items-center w-[100%] text-lg px cursor-pointer hover:bg-red-800 ${isActive && 'bg-red-700'}` 
            }}><span><MdDelete /></span>Delete Account</NavLink>
            </li>
            
        </ul>
    </div>
  )
}

export default UserSidebar