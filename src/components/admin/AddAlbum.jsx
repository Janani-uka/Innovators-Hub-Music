import React, { useState } from "react";
import Spinner from "../../helpers/Spinner";
import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";



const AddAlbum = () => {
  let [isloading, setIsloading] = useState(false);
  let [album, setAlbum] = useState({
    albumTitle: "",
    albumPoster: null,
    albumReleaseDate: "",
    albumLanguages: "",
    albumDescription: "",
  });
  let {
    albumTitle,
    albumPoster,
    albumReleaseDate,
    albumLanguages,
    albumDescription,
  } = album;
  let handleAlbumChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setAlbum({ ...album, [key]: value });
  };
  let handleAlbumPosterChange = (e) => {
    let file = e.target.files[0];
    setAlbum({ ...album, albumPoster: file });
  };

  let initialSongData = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSingers: "",
    songMood: "",
    songDirector: "",
  };

  let [songs, setSongs] = useState([initialSongData]);

  let addSong = () => {
    setSongs([...songs, { ...initialSongData }]);
  };

  let removeSong = (ind) => {
    let newSongs = songs.filter((value, index) => index !== ind);
    setSongs(newSongs);
  };

  let handleSongChange = (e, index) => {
    let value = e.target.value;
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = value;
    setSongs(copy);
  };

  let handleSongFileChange = (e, index) => {
    let file = e.target.files[0];
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = file;
    setSongs(copy);
  };

  let handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();

    // console.log(album);
    console.log(songs);

    try {
      let albumPosterData = new FormData();
      albumPosterData.append("file", albumPoster);
      albumPosterData.append("upload_preset", "Innovators Hub Music");
      let posterResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dlyh3kfoq/image/upload",
        { method: "POST", body: albumPosterData }
      );
      let posterResult = await posterResponse.json();
      console.log(posterResult);
      let albumId = posterResult.asset_id;
      let albumPosterURL = posterResult.url;
      let albumData = {
        albumId: albumId,
        albumTitle: albumTitle,
        albumPoster: albumPosterURL,
        albumReleaseDate: albumReleaseDate,
        albumLanguages: albumLanguages,
        albumDescription: albumDescription,
      };
      console.log(albumData);

      let songData=[]

      await Promise.all(songs.map(async (value, index) => {
        console.log(value);
        
        let songThumbnailData = new FormData();
        songThumbnailData.append("file", value.songThumbnail);
        songThumbnailData.append("upload_preset", "Innovators Hub Music");
        console.log(songThumbnailData);
        
        let songThumbnailResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dlyh3kfoq/image/upload",
          { method: "POST", body: songThumbnailData }
        );
        let songThumbnailResult = await songThumbnailResponse.json();

        let songThumbnailURL = songThumbnailResult.url;

        console.log(value.songFile);
        
        let songFileData = new FormData();
        songFileData.append("file", value.songFile);
        songFileData.append("upload_preset", "Innovators Hub Music");
        console.log(songFileData);
        
        let songFileResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dlyh3kfoq/upload",
          { method: "POST", body: songFileData }
        );
        let songFileResult = await songFileResponse.json(); 

      
        console.log(songFileResult);
        

        let songFileURL = songFileResult.url;
        let songFileFormat = songFileResult.format;
        let songFileByte = songFileResult.bytes;
        let songFileId= songFileResult.asset_id;
        let songFileDuration= songFileResult.duration;

       let songPayload={
        songId:songFileId,
        songName:value.songName,
        songURL:songFileURL,
        songThumbnailURL:songThumbnailURL,
        songFormat:songFileFormat,
        songBytes:songFileByte,
        songDuration:songFileDuration,
        songSingers:value.songSingers,
        songMood:value.songMood,
        songDirector:value.songDirector
       }
        
          songData.push(songPayload)

        
          
      }))
      let payload={...albumData,songs:songData}
      console.log(payload);


      let album_collection=doc(__DB,"album_collection",albumData.albumId)
      await setDoc(album_collection,payload)
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <section className="h-[100%] w-[100%] flex p-6 justify-center ">
      <article className="min-h-[800px] bg-slate-950 w-[75%] rounded-xl p-6">
        <h2 className="text-center text-2xl text-white font-semibold">
          Add Album
        </h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <h3 className="text-xl ">Album Details</h3>
          <article className="mt-3 flex flex-wrap gap-3">
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="albumTitle"
                className="block text-[18px] text-white"
              >
                Album title
              </label>
              <input
                type="text"
                id="albumTitle"
                placeholder="Enter your album title"
                className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                value={albumTitle}
                name="albumTitle"
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="albumPoster"
                className="block text-[18px] text-white"
              >
                Album poster
              </label>
              <input
                type="file"
                id="albumPoster"
                className="text-black outline-none bg-white py-2 px-4 rounded-lg  file:bg-slate-700 file:px-3 file:text-white file:rounded-sm"
                name="albumPoster"
                onChange={handleAlbumPosterChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="albumReleaseDate"
                className="block text-[18px] text-white"
              >
                Release Date
              </label>
              <input
                type="date"
                id="releaseDate"
                placeholder="Enter Release Date"
                className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                value={albumReleaseDate}
                name="albumReleaseDate"
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label
                htmlFor="albumLanguages"
                className="block text-[18px] text-white"
              >
                Languages
              </label>
              <input
                type="text"
                id="languages"
                placeholder="Enter languages"
                className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                value={albumLanguages}
                name="albumLanguages"
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[98%]">
              <label
                htmlFor="albumDescription"
                className="block text-[18px] text-white"
              >
                Album Description
              </label>
              <textarea
                id="albumDescription"
                placeholder="Enter album Description"
                className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                value={albumDescription}
                name="albumDescription"
                onChange={handleAlbumChange}
              />
            </div>
          </article>
          <h3 className="text-xl mt-3">Song Details</h3>
          <article className="mt-3 flex flex-col gap-4">
            {songs.map((value, index) => {
              return (
                <section className="bg-slate-700 p-4 rounded-lg ">
                  <h4 className="text-center text-lg">Song {index + 1}</h4>
                  <main className="flex flex-wrap gap-3">
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songName"
                        className="block text-[18px] text-white"
                      >
                        Song Name
                      </label>
                      <input
                        type="text"
                        id="songName"
                        placeholder="Enter your song name"
                        className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                        value={value.songName}
                        name="songName"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songFile"
                        className="block text-[18px] text-white"
                      >
                        Song File
                      </label>
                      <input
                        type="file"
                        id="songFile"
                        placeholder=""
                        className="text-black outline-none bg-white py-2 px-4 rounded-lg  file:bg-slate-700 file:px-3 file:text-white file:rounded-sm"
                        name="songFile"
                        onChange={(e) => handleSongFileChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songThumbnail"
                        className="block text-[18px] text-white"
                      >
                        Thumbnail
                      </label>
                      <input
                        type="file"
                        id="songThumbnail"
                        placeholder=""
                        className="text-black outline-none bg-white py-2 px-4 rounded-lg  file:bg-slate-700 file:px-3 file:text-white file:rounded-sm"
                        name="songThumbnail"
                        onChange={(e) => handleSongFileChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songSingers"
                        className="block text-[18px] text-white"
                      >
                        Singers
                      </label>
                      <input
                        type="text"
                        id="songSingers"
                        placeholder="Enter song singers"
                        className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                        value={value.songSingers}
                        name="songSingers"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songMood"
                        className="block text-[18px] text-white"
                      >
                        Mood
                      </label>
                      <input
                        type="text"                   
                        id="songMood"
                        placeholder="Enter song mood"
                        className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                        value={value.songMood}
                        name="songMood"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songDirector"
                        className="block text-[18px] text-white"
                      >
                        Director
                      </label>
                      <input
                        type="text"
                        id="songDirector"
                        placeholder="Enter song director"
                        className="text-black outline-none bg-white py-2 px-4 rounded-lg"
                        value={value.songDirector}
                        name="songDirector"
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </div>
                    <div className="flex justify-between w-[100%]">
                      <div>
                        {songs.length - 1 === index && (
                          <input
                            type="button"
                            value="Add Song"
                            className="py-2 px-4 bg-green-500 rounded lg"
                            onClick={addSong}
                          />
                        )}
                      </div>
                      <div>
                        {songs.length > 1 && (
                          <input
                            type="button"
                            value="Remove Song"
                            className="py-2 px-4 bg-red-500 rounded lg"
                            onClick={() => removeSong(index)}
                          />
                        )}
                      </div>
                    </div>
                  </main>
                </section>
              );
            })}
          </article>
          <button className="w-[98%] py-2 cursor-pointer bg-blue-600  hover:bg-blue-400 rounded-lg mt-3">
            Upload Album
          </button>
        </form>
      </article>
      {isloading && <Spinner />}
    </section>
  );
};

export default AddAlbum;