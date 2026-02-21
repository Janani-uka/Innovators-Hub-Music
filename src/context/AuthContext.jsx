import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { __AUTH } from "../backend/FirebaseConfig";

export const AuthContextAPI=createContext()
const AuthProvider=(props)=>{
    let [authUser, setAuthUser]=useState(null)

    useEffect(()=>{
        onAuthStateChanged(__AUTH,(userInfo)=>{
            console.log(userInfo);
            if(userInfo?.emailVerified==true){
                setAuthUser(userInfo)
                window.localStorage.setItem("TOKEN",userInfo.accessToken)
            }
            
            else{
                setAuthUser(null)
            }
            
        }),[__AUTH]
    })
    return (<AuthContextAPI.Provider value={{authUser,setAuthUser}}>
        {props.children}
        

    </AuthContextAPI.Provider>
)

}
export default AuthProvider