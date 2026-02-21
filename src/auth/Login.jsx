import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate} from 'react-router-dom';
import { __AUTH } from '../backend/FirebaseConfig';
import Spinner from '../helpers/Spinner';
import { AuthContextAPI } from '../context/AuthContext';

const Login = () => {
  let [togglePassword,setTogglepassword]=useState(false)
  
  let [isloading,setIsloading]=useState(false)
  
  let [data,setData]=useState({
    email:"",
    password:""
  })
let {email,password}=data
let navigate=useNavigate()
let{setAuthUser}=useContext(AuthContextAPI)

  let handleChange=(e)=>{
    let value=e.target.value;
    let key=e.target.name;
    setData({...data,[key]:value})
  }
  const handleSubmit=async(e)=>{
    setIsloading(true)
    e.preventDefault()
    try{
let obj=await signInWithEmailAndPassword(__AUTH,email,password)
let {user}=obj;
console.log(obj);
if(user.emailVerified==true){
  toast.success("Login successful")
  setAuthUser(user)
  navigate("/")
}
else{
  toast.error("Verify your email")
  sendEmailVerification(user)
}


    }catch(error){
      toast.error(error.message)
    }
    finally{
      setIsloading(false)
    }
    
  }
  return (
<section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center'>
      <div className='w-[30%] p-4 rounded-lg bg-slate-600'>
        <header>
          <h1 className='text-3xl text-center'>Login</h1>
        </header>
        <main className='p-2'>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block'>Email</label>
            <input type="email" id="email" placeholder='Enter email'
            className='outline-none border-1 py-1 my-1 w-[100%] rounded-lg pl-1'name='email' value={email} onChange={handleChange}></input>
          </div>  
          <div className='relative'>
            <label htmlFor='password' className='block'>Password</label>
            <input type={togglePassword?"text":"password"} id="password" placeholder='Enter password'
            className='outline-none border-1 py-1 my-1 w-[100%] rounded-lg pl-1' name='password' value={password} onChange={handleChange}></input>
            {togglePassword?(
            <FaEye className='absolute top-9 right-4' onClick={()=>setTogglepassword(!togglePassword)}/>
            ): (
            <FaEyeSlash className='absolute top-9 right-4'  onClick={()=>setTogglepassword(!togglePassword)} />
            )}
          </div>
          <div>
            <button className='outline-none py-2  hover:bg-b w-[100%] cursor-pointer rounded bg-slate-900 mt-2'>Login</button>
          </div>
          <div className='mt-2 text-center '><span>Don't have an account ?</span>
          <NavLink to="/auth/register" className="text-blue-400 "> Register</NavLink>
          </div>
          <div className='mt-1 text-center '>
          <NavLink to="/auth/forget-password" className="text-blue-400"> Forget Password</NavLink> 
          </div>
          
          </form>
        </main>
      </div>
     {isloading && <Spinner/>}
    </section>
      )
}

export default Login