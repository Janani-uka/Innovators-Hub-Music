import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import { UserContextAPI } from '../../context/UserContext'


const UserAccount = () => {
  let{authUser}=useContext(AuthContextAPI)
  // let[profile,setProfile]=useState(null)
 let{userProfile}= useContext(UserContextAPI)
  return (
    <section className='h-[100%] w-[100%] flex justify-center items-center'>
      <article className='min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4 '>
        <header className='h-[110px] w-[100%] bg-slate-700 rounded-t-xl flex flex-col items-center gap-1'>
          
            <img src={authUser?.photoURL} alt="" className='h-25 w-25 rounded-full -mt-16'/>
            <h2>{authUser?.displayName}</h2>
            <h2>{authUser?.email}</h2>
          </header>
          {userProfile ?<> <div className='mt-2'>
            <h2 className='text-xl text-indigo-400'>Personal Info</h2>
          </div>
          <article className='flex flex-wrap gap-2 mt-2'>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-500 font-semibold'>Name :</h3>
            <article>
              <p>{userProfile?.name}</p>
            </article>
          </div>
          <div className='w-[48%]  bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-500 font-semibold'>Phone Number :</h3>
            <article>
              <p>{userProfile?.phoneNumber}</p>
            </article>
          </div>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-500 font-semibold'>Date of Birth :</h3>
            <article>
              <p>{userProfile?.dateofbirth}</p>
            </article>
          </div>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-500 font-semibold'>Language :</h3>
            <article>
              <p>{userProfile?.language}</p>
            </article>
          </div>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-500 font-semibold'>Address :</h3>
            <article>
              <p>{userProfile?.address}</p>
            </article>
          </div>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-500 font-semibold'>Gender :</h3>
            <article>
              <p>{userProfile?.gender}</p>
            </article>
          </div>
          </article>
          </>

          :<>
          
          <div className='h-[150px] w-[100%] flex items-center justify-center flex-col gap-2'>
            <h2 className='text-lg'>User Data not present </h2>
            <NavLink to="/user-profile/update-profile" className="py-2 px-2 bg-blue-800 hover:bg-blue-600 rounded-xl">Add User Data</NavLink>

          </div>
          </>}
        </article>
    </section>
  )
}

export default UserAccount