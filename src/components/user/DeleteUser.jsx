import { deleteUser } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { MdOutlineDeleteForever } from "react-icons/md";
import { AuthContextAPI } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { __DB } from '../../backend/FirebaseConfig';

const DeleteAccount = () => {
    let [text,setText]=useState("")
    let{authUser}=useContext(AuthContextAPI)
    let navigate=useNavigate()
    let handleChange=(e)=>{
       setText( e.target.value)
    }
    let handleSubmit=async (e)=>{
        e.preventDefault()
        try {
          if(text.toLowerCase().trim()==="delete account") {
            let user_collection=doc(__DB,"user_profile",authUser?.uid)
          await  deleteUser(authUser)
         await deleteDoc(user_collection)
            toast.success("account deleted")
            navigate("/auth/register")
          } 
          else{
            toast.error("Invalid message")
          }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
   <section className="h-[100%] w-[100%] flex items-center justify-center">
    <article className="min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4">
<h2 className='text-center font-semibold text-2xl'> Delete Account</h2>
    <form c className='mt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
        <div>
            <h3>Are you sure you want to delete the account ?</h3>
            <h3> if yes enter delete account</h3>
        </div>
        <input type="text" placeholder='delete account' className="outline-none bg-white py-2 px-4 rounded-lg text-black w-[100%]" name="text" onChange={handleChange}/>
        <button className='py-2 w-full rounded-lg  bg-red-600 cursor-pointer hover:bg-red-800'><span>Delete Account</span></button> 
    </form>

    </article>
   </section>
    
  )
}

export default DeleteAccount