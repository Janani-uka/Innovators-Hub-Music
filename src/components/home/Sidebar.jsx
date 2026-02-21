import React from 'react'
import { MdSwitchAccount } from 'react-icons/md'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='h-[calc(100vh-70px)]  sticky top-[70px]   shadow-md w-[18%] bg-slate-600 py-12 px-4 shrink-0 '>
    <ul className='flex flex-col gap-5 '>
    
        <li>
            <NavLink to="/" end className={(obj)=>{
          let {isActive}=obj
          return ` py-2 px-4 rounded-lg font-semibold text-lg flex gap-2 items-center w-[100%] px cursor-pointer hover:bg-blue-800 ${isActive && 'bg-blue-700'}` 
        }}><span><MdSwitchAccount /></span>Dashboard</NavLink>
        </li>
    
      
    </ul>
</div>
  )
}

export default Sidebar