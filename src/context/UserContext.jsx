import { createContext, useContext, useEffect, useState } from "react"
import { __DB } from "../backend/FirebaseConfig"
import { AuthContextAPI } from "./AuthContext"
import { doc, onSnapshot } from "firebase/firestore"


export let UserContextAPI=createContext()
let UserProvider=(props)=>{
    let {authUser}=useContext(AuthContextAPI)
    let [userProfile,setUserProfile]=useState(null)
    let[isloading,setIsloading]=useState(true)
    useEffect(()=>{
        let fetchProfile=()=>{
            let user_collection=doc(__DB,"user_profile",authUser?.uid)
            onSnapshot(user_collection,(data)=>{
                // console.log(data.data());
                setUserProfile(data.data())

            })
        }
        if(authUser){
            fetchProfile()
        }
        setIsloading(false)

    },[authUser])
    return <UserContextAPI.Provider value={{userProfile,isloading}}>
        
            {props.children}

        
    </UserContextAPI.Provider>
}
export default UserProvider