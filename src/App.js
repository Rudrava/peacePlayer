// dependencies
import {useState,useRef} from 'react'

// styles
import "./styles/App.scss"

// components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library"
import Nav from "./components/Nav"

// data
import sastaSpotify from "./data"

// utils
import {playAudio} from "./utils"

function App() {
  // states
  const [songs, setSongs] = useState(sastaSpotify())
  const [currentSong,setCurrentSong] = useState(songs[2])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    trackPercent: 0
  });   
  const [libraryStatus, setLibraryStatus] = useState(false)

  // events
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    const trackPercent = Math.round((Math.round(current) / Math.round(duration)) * 100)
    setSongInfo({...songInfo, currentTime: current, duration, trackPercent})
  } 
  const songEndHandler = e => {
      setCurrentSong(songs[(songs.findIndex(song => song._id === currentSong._id) + 1) % songs.length])
      playAudio(isPlaying, audioRef)
  }
  return (
    <div className={`App ${libraryStatus ? 'libraryActive' : ""}`} >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song 
        currentSong={currentSong}
      />
      
      <Player 
        songs = {songs}
        setSongs = {setSongs}
        currentSong={currentSong}
        setCurrentSong= {setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library 
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      {/* dont move the following line from here or add anything here */}
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
      
    </div>
  );
}

export default App;
