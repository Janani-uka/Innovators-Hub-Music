import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __AUTH } from '../backend/FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../helpers/Spinner';

const Register = () => {
  let [togglePassword,setTogglepassword]=useState(false)
  let [toggleConfirmPassword,setToggleConfirmpassword]=useState(false)
  let navigate=useNavigate()
  let [isloading,setIsloading]=useState(false)
  let[data,setData]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
  })
  let {username,email,password,confirmpassword}=data;

  let handleChange=(e)=>{
    let value=e.target.value;
    let key=e.target.name;
    setData({...data,[key]:value})
}

let handleSubmit=async(e)=>{
  setIsloading(true)
  e.preventDefault();
  try{ 
   
if(password !== confirmpassword){
  toast.error("Confirm password does not match")
setData({...data,confirmpassword:""})
}
else{
  let obj=await createUserWithEmailAndPassword(__AUTH,email,password)
  console.log(obj);
  let {user}=obj;
  console.log(user);
 await updateProfile(user,{
    displayName:username,
    photoURL:"https://tse2.mm.bing.net/th?id=OIP.lvzPu-WOW4Iv7QyjP-IkrgHaHa&pid=Api&P=0&h=180" })
  sendEmailVerification(user)
  toast("Verification link sent")
  toast.success("User Registered")
  navigate("/auth/login")
}
}
catch (error){
 console.log(error);
 toast.error(error.message);
//  toast.error(error.message.slice(22,error.mesage.length-2))
 

}
finally{
  setIsloading(false)
}

  
}
  return (
    <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center'>
      <div className='w-[30%] p-4 rounded-lg bg-slate-600'>
        <header>
          <h1 className='text-3xl text-center'>Register</h1>
        </header>
        <main className='p-2'>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username' className='block'>Username</label>
            <input type="text" id="username" placeholder='Enter username' name="username" value={username} onChange={handleChange}
            className='outline-none border-1 py-1 my-1 w-[100%] rounded-lg pl-1'></input>
          </div>
          <div>
            <label htmlFor='email' className='block'>Email</label>
            <input type="email" id="email" placeholder='Enter email' name="email" value={email} onChange={handleChange}
            className='outline-none border-1 py-1 my-1 w-[100%] rounded-lg pl-1'></input>
          </div>  
          <div className='relative'>
            <label htmlFor='password' className='block'>Password</label>
            <input type={togglePassword?"text":"password"} id="password" placeholder='Enter password' name="password" value={password} onChange={handleChange}
            className='outline-none border-1 py-1 my-1 w-[100%] rounded-lg pl-1'></input>
            {togglePassword?(
            <FaEye className='absolute top-9 right-4' onClick={()=>setTogglepassword(!togglePassword)}/>
            ): (
            <FaEyeSlash className='absolute top-9 right-4'  onClick={()=>setTogglepassword(!togglePassword)} />
            )}
          </div>
          <div className='relative'>
            <label htmlFor='confirmpassword' className='block'>Confirm password</label>
            <input type={toggleConfirmPassword?"text":"password"} id="confirm password" placeholder='Enter confirm password' name="confirmpassword" value={confirmpassword} onChange={handleChange}
            className='outline-none border-1 py-1 my-1 w-[100%] rounded-lg pl-1'></input>
            {toggleConfirmPassword?(
            <FaEye className='absolute top-9 right-4' onClick={()=>setToggleConfirmpassword(!toggleConfirmPassword)}/>
            ): (
            <FaEyeSlash className='absolute top-9 right-4' onClick={()=>setToggleConfirmpassword(!toggleConfirmPassword)} />
            )}
            
          </div>
          <div>
            <button className=' hover:bg-slate-700 outline-none py-1 my-1 w-[100%]  cursor-pointer rounded bg-slate-900 mt-2'>Register</button>
          </div>
         <div className='text-center mt-2'> <span>Already have an account?</span>
         <NavLink to="/auth/login " className="text-blue-300"> Login</NavLink></div>
          </form>
        </main>
      </div>
{isloading && <Spinner/>}
    </section>
  )
}

export default Register