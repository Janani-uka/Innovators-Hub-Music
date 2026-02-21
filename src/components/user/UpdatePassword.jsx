import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { __AUTH } from '../../backend/FirebaseConfig';
import Spinner from '../../helpers/Spinner';

const UpdatePassword = () => {
  let [isloading,setIsloading]=useState(false)
  let navigate=useNavigate()
let [email,setEmail]=useState("")
const handleChange=(e)=>{
    setEmail(e.target.value)
}
const handleSubmit=async(e)=>{
    setIsloading(true)
    e.preventDefault()
    try{
      await  sendPasswordResetEmail(__AUTH,email)
        toast.success("Update your password")
         navigate("/")
    }
    catch(error){
        toast.success(error.message)
    }
    finally{
        setIsloading(false)
    }
}
return (
<section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center'>
     <div className='w-[30%] p-4 rounded-lg bg-slate-600'>
       <header>
         <h1 className='text-3xl text-center'>Update password</h1>
       </header>
       <main className='p-2'>
         <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
         <div>
           <label htmlFor='email' className='block'>Email</label>
           <input type="email" id="email" placeholder='Enter email'
           className='outline-none border-1 py-1 my-1 w-[100%] rounded-lg pl-1'name='email' value={email} onChange={handleChange}></input>
         </div>  
        
         
         <div>
           <button className='outline-none py-2  hover:bg-slate-700 w-[100%] cursor-pointer rounded bg-slate-900 mt-2'>Update Password</button>
         </div>
         <div className='mt-2   text-center '>
            
      <NavLink to="/auth/login" className=" block outline-none py-2 font-semibold hover:bg-red-500 w-[100%] cursor-pointer rounded bg-red-700 mt-2"> Cancel</NavLink>
      </div>
         
         </form>
       </main>
     </div>
    {isloading && <Spinner/>}
   </section>
)
}


export default UpdatePassword