import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { UserContextAPI } from '../../context/UserContext';
import Spinner from '../../helpers/Spinner';
import { useNavigate } from 'react-router-dom';
import { __DB } from '../../backend/FirebaseConfig';


const UpdateProfile = () => {
  let navigate=useNavigate()
  let [isloading,setIsloading]=useState(false)
  let {authUser}=useContext(AuthContextAPI)
  let {userProfile}=useContext(UserContextAPI)
  let [data,setData]=useState({
    phoneNo:userProfile?.phoneNumber,
    dob:userProfile?.dateofbirth,
    language:userProfile?.language,
    gender:userProfile?.gender,
    address:userProfile?.address
  })

  let {phoneNo,dob,language,gender,address}=data;


  let handleChange=(e)=>{
    let key=e.target.name
    let value=e.target.value
    setData({...data,[key]:value})
    
    

  }

  let handleSubmit=async(e)=>{
    setIsloading(true)
    e.preventDefault()
    let {displayName ,email,photoURL,uid }=authUser
    let payload={
      name:displayName,
      email:email,
      photo:photoURL,
      id:uid,
      phoneNumber:phoneNo,
      dateofbirth:dob,
      gender:gender,
      language:language,
      address:address,
      role:"user"

    }
    try{
     let user_collection=doc(__DB,"user_profile",uid)
    await setDoc(user_collection,payload)
    console.log(payload);
     toast.success("Details Added")
     navigate("/user-profile")
    }
    catch(error){
      toast.error(error.message)

    }
    finally{
      setIsloading(false)
  }
    

    
  }
  return (
    <section className='h-[100%] w-[100%] flex items-center justify-center'>
      <article className='min-h-[400px] w-[60%] bg-slate-900 rounded-xl p-4'>
        <h2 className='text-center text-2xl'>Upload Profile data</h2>
        <form className='mt-8 flex flex-col gap-4'onSubmit={handleSubmit}>
          <article className='flex gap-5 '>
          <div className='flex flex-col gap-2 w-[48%]'>
          <label htmlFor="phoneNo" className='block text-[18px] '>Phone Number:</label>
          <input type="tel" id='phoneNo' placeholder='Enter Phone Number' name="phoneNo" value={phoneNo}className='outline-none bg-white py-2 px-4 rounded-lg text-black' onChange={handleChange}/>
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
          <label htmlFor="dob" className='block text-[18px] '>Date of Birth:</label>
          <input type="date" id='dob' placeholder='Enter Date of Birth' name="dob" value={dob} onChange={handleChange}className='outline-none bg-white py-2 px-4 rounded-lg text-black'/>
          </div>
          </article>
          <article className='flex gap-5 '>
          <div className='flex flex-col gap-2 w-[48%]'>
          <label htmlFor="language" className='block text-[18px] '>Language:</label>
          <input type="text" id='language' placeholder='Enter Language' onChange={handleChange} name="language" value={language}className='outline-none bg-white py-2 px-4 rounded-lg text-black'/>
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
          <label className='block text-[18px] '>Gender:</label>
          <div className='flex gap-4 font-semibold text-lg'>
          <div className='flex gap-2'><input type="radio" name='gender' value="Male"onChange={handleChange} checked={gender=="Male"}/><span>Male</span></div>

          <div className='flex gap-2'><input type="radio"  name='gender' value="Female" onChange={handleChange} checked={gender=="Female"}/><span>Female</span></div>

          <div className='flex gap-2'><input type="radio" name='gender' value="Others" onChange={handleChange} checked={gender=="Others"}/><span>Others</span></div>
          </div>
          </div>
          </article>
          <article>
            <div className='flex flex-col gap-2 w-[100%]'>
            <label htmlFor="address">Address :</label>
            <textarea name="address" id="address" placeholder='Enter Address' onChange={handleChange}  value={address} className='outline-none bg-white py-2 px-4 rounded-lg text-black'></textarea>
            </div>
          </article>
          <article>
            <button className='outline-none py-2  hover:bg-blue-800 w-[100%]  bg-blue-600 cursor-pointer rounded mt-2' >Submit
            </button>
          </article>
        </form>
      </article>
      {isloading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile