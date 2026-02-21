import React, { useContext } from 'react'
import Sidebar from '../components/home/Sidebar'
import { Outlet } from 'react-router-dom'
import { AlbumContextAPI } from '../context/AlbumContext'
import CustomAudioPlayer from 'react-pro-audio-player'

const Home = () => {
  let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(AlbumContextAPI)
  
  return (
   <>
    <div className='flex bg-slate-800 min-h-[calc(100vh-70px)]'>
      <Sidebar/>
      <Outlet/>
    </div>
     {currentSongIndex !== null && (
      <div className='fixed bottom-0 w-full'>
        <CustomAudioPlayer
        songs={songs}
        isPlaying={isPlaying}
        currentSongIndex={currentSongIndex}
        onPlayPauseChange={setIsPlaying}
        onSongChange={setCurrentSongIndex}
        songUrlKey="songURL"
        songNameKey="songName"
        songThumbnailKey="songThumbnailURL" 
        songSingerKey="songSingers"
      />
      </div>
    )}
   </>

  )
}

export default Home