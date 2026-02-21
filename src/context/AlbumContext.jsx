import { collection, getDocs } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { __DB } from "../backend/FirebaseConfig"

export const AlbumContextAPI=createContext()
let AlbumProvider=(props)=>{
    let [isloading,setIsloading]=useState(false)
    let [albums,SetAlbums]=useState([])

    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);

useEffect(()=>{
    let fetchAlbums=async()=>{
        try{
            setIsloading(true)
            let album_collection=collection(__DB,"album_collection")
          let albumSnapshot=await  getDocs(album_collection)
         let albumList= albumSnapshot.docs.map(doc=>doc.data())
         console.log(albumList);
         SetAlbums(albumList)

         
        }catch(error){
            console.log(error);
            
        }
        finally{
            setIsloading(false)
        }
    }
    fetchAlbums()
},[])

    return (<AlbumContextAPI.Provider value={{albums,isloading,songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}}>
        {props.children}
    </AlbumContextAPI.Provider>
    )

}
export default AlbumProvider