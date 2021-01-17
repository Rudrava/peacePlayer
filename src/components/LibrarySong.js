// utils
import {playAudio} from "../utils"


const LibrarySong = ({id, song,songs,setSongs, setCurrentSong,isPlaying, audioRef}) => {
    const songSelectHandler = () => {
        // note devEd got id here and filtered it against all the songs
        // so in future if u see id in code the get it as 
        // song.id and i would leave songs here as is
        setCurrentSong(song)
        setSongs(songs.map(song => song._id === id ? {...song,active: true,} : {...song,active: false}))
        playAudio(isPlaying, audioRef)
        // this is when i was was sleepyAF 
        // but wanted to sleep as i wanted to get this
        // feature working
        // dont know if dev did it this way or something else
        // but at this poing it looks good 
        // goodnight 
        // sweetdreams and listen to good music 
        // setIsPlaying( isPlaying ? !isPlaying : isPlaying)
    }

    return (
        <div onClick={songSelectHandler} className={`librarySong ${song.active ? "selected" : ""}`}>
            <img src={song.cover} alt={`${song.name}cover`} />
            <div className="songDescription">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong