import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContextAPI } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import { updateProfile } from 'firebase/auth';
import Spinner from '../../helpers/Spinner';

const UpdatePicture = () => {
  let[picture,setPicture]=useState(null)
let[preview,setPreview]=useState(null)
let{authUser}=useContext(AuthContextAPI)
let navigate=useNavigate()
let[isloading,setIsloading]=useState(false)


  const handleChange=(e)=>{
    // console.dir(e.target.files[0]);
    let file=e.target.files[0]
    setPicture(file)

    if(file){
      let url=URL.createObjectURL(file)
      console.log(url);
      setPreview(url)
      
    }
    
  }
  const handleSubmit=async(e)=>{
    setIsloading(true)
    e.preventDefault()
    try{
      if(!picture){
        toast.error("Select a photo")
        return
      }
      else{
        const data=new FormData()
        data.append("file",picture)
data.append("upload_preset","Innovators Hub Music")
let response= await fetch ("https://api.cloudinary.com/v1_1/dlyh3kfoq/image/upload",{ method:"POST",body:data
})
let result=await response.json()
console.log(result);
await updateProfile(authUser,{
  photoURL:result.url
      })
      toast.success("Photo updated")
      navigate("/user-profile")

      }

    }catch(error){
      toast.error(error.message)
    }
    finally{
      setIsloading(false)
    }
  }
  return (
    <section className='h-[100%] w-[100%] flex items-center justify-center'>
<article className='min-h-[300px] w-[40%] p-4 bg-slate-900 rounded-xl '>
<h2 className='text-center text-2xl'>Upload profile picture</h2>

<form action="" className='flex flex-col gap-2 mt-4' onSubmit={handleSubmit}>
  <div className='w-32 h-32 m-auto bg-gray-400 rounded-full'>
    {preview ? <img src={preview} alt="" className='h-[100%] w-[100%] rounded-full'/>
    :
    <div className='h-[100%] w-[100%] rounded-full flex justify-center items-center'>No file selected</div>}
  </div>
  <label htmlFor="picture"className='block py-2 w-[100%]  text-center rounded-lg border-dotted border-2'accept="image/">Select a photo</label>
  <input type="file" id="picture" className='hidden' onChange={handleChange} name="picture"/>
  <button className='py-2 w-[100%] bg-blue-600 rounded-b-lg cursor-pointer hover:bg-blue-400'>Upload photo</button>
</form>
</article>
{isloading && <Spinner/>}
</section>
  )
}

export default UpdatePicture