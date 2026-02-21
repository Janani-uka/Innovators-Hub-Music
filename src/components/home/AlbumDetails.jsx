import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AlbumContextAPI } from '../../context/AlbumContext';

const AlbumDetails = () => {
    let data=useLocation()
    let{state:{album}}=data;
    let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(AlbumContextAPI)
    
    let handleClick=(index)=>{
        setSongs(album.songs)
        setCurrentSongIndex(index)
        if(currentSongIndex == index){
            setIsPlaying(!isPlaying)
        }
        else{
            setIsPlaying(true)
        }
    }
    const formatduration=(durationInSeconds)=>{
        let minutes=Math.floor((durationInSeconds/60))
        let seconds=Math.floor((durationInSeconds%60))
        return `${minutes}:${seconds.toString().padStart(2,'0')}`
    }
    
  return (
   <section className='p-6'>
    <article className='flex gap-8'>
        <aside className='shrink-0'>
            <img src={album.albumPosterURL}alt='' className='h-[370px] w-[310px] rounded-md'/>
        </aside>
        <aside className=''>
            <h2 className='text-3xl font-semibold'>{album.albumTitle}</h2>
            <ul className='mt-4 flex flex-col gap-3 text-lg'>
                <li className='flex'>
                    <span className='w-[150px]'>Title</span>
                    <span>{album.albumTitle}</span>
                </li>
                <li className='flex'>
                    <span className='w-[150px]'>Number of tracks</span>
                    <span>{album.songs.length}</span>
                </li>
                <li className='flex'>
                    <span className='w-[150px]'>Release Date</span>
                    <span>{album.albumReleaseDate}</span>
                </li>
                <li className='flex'>
                    <span className='w-[150px]'>Languages</span>
                    <span>{album.albumLanguages}</span>
                </li>
                <li className='flex '>
                    <span className='w-[150px] shrink-0'>Description </span>
                    <span>{album.albumDescription}</span>
                </li>
            </ul>
        </aside>
    </article>
    <main className={`p-4 mt-4 bg-slate-900 rounded-lg  ${currentSongIndex !== null && "mb-[120px]"}`}>
        <h3 className='text-xl p-4'>Songs list</h3>
        <table className='w-full mt-4 text-left rounded-lg overflow-hidden'>
            <thead className='bg-slate-700 uppercase w-full'>
                <tr>
                    <th className='px-4 py-3'></th>
                    <th className='px-4 py-3'>Track</th>
                    <th className='px-4 py-3'>Song Name</th>
                    <th className='px-4 py-3'>Singers</th>
                    <th className='px-4 py-3'>Director</th>
                    <th className='px-4 py-3'>Mood</th>
                    <th className='px-4 py-3'>Duration</th>
                </tr>
            </thead>
            <tbody className='w-full'>
                {album.songs.map((song,index)=>{
                    return <tr className='border-y-2 border-slate-700 hover:border-slate-500 cursor-pointer' onClick={()=>handleClick(index)}>
                        <td className='py-2 text-center' >{index+1}</td>
                        <td className='py-2 text-center'>
                            <img src={song.songThumbnailURL} alt='' className='h-12 w-[70%] rounded-lg '/>
                        </td>
                        <td className='py-2'>{song.songName}</td>
                        <td className='py-2'>{song.songSingers}</td>
                        <td className='py-2'>{song.songDirector}</td>
                        <td className='py-2'>{song.songMood}</td>
                        <td className='py-2 text-center'>{formatduration(song.songDuration)}</td>
                    </tr>
                    

                })}

            </tbody>
        </table>
    </main>
   </section>
  )
}

export default AlbumDetails