import {useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay,faPause, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

// utils
import {playAudio} from "../utils"

const Player = ({songs,setSongs, setCurrentSong, currentSong, isPlaying,setIsPlaying, audioRef, setSongInfo, songInfo}) => {
    // effect 
    useEffect(() => {
        setSongs(songs.map(song => (song._id === currentSong._id ? {...song, active: true} : {...song, active: false})))
    }, [currentSong])
    
    // ref 
    // event handlers
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play() 
        }
        setIsPlaying(!isPlaying);
    }
    const dragHandler = e => {
        // gets the node and changes the current value to selected value
        audioRef.current.currentTime = e.target.value
        // changes the current time
        // this thing works even without this line below 
        // as when we are updating the current time for the audio ref above 
        // it triggers the time update handler which already updates the current time 
        // of the songInfo state 
        // I think devEd is setting this bug 
        // would let u know the further updates
        setSongInfo({...songInfo, currentTime: e.target.value})
    }
    const skipTrackHandler = (skipDir) => {
        const currInd = songs.findIndex(song => song._id === currentSong._id)
        if(skipDir === "skipBack") {
            setCurrentSong((songs[((currInd - 1) % songs.length) < 0 ? (songs.length - 1) : ((currInd - 1) % songs.length)]) )
        } else {
            setCurrentSong(songs[(currInd + 1) % songs.length])
        }
        // added here changed from ref as its dependency array tracked current track for whcih if i even changed
        // the song from the library then also this util method got triggered
        playAudio(isPlaying, audioRef)
    }

    // sanitize time data
    const getTime = (time) => `${Math.floor(time/60)}:${("0" + Math.floor(time%60)).slice(-2)}` 
    
    // animation and track gradient css
    const trackAnim = {
        transform: `translateX(${songInfo.trackPercent}%)`
    }

    const trackGradient = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    }
    return (
        <div className="player">
            <div className="timeControl">
                <p>{getTime(songInfo.currentTime) }</p>
                <div className="track" style={trackGradient}>
                    <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range"/>
                    <div className="animateTrack" style={trackAnim}>
                        
                    </div>
                </div>
                <p>{getTime(songInfo.duration ?   songInfo.duration : 0) }</p>
            </div>
            <div className="playControl">
                <FontAwesomeIcon className="skipBack" onClick={() => skipTrackHandler("skipBack")} icon={faAngleDoubleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" icon={isPlaying ? faPause : faPlay }/>
                <FontAwesomeIcon className="skipForward" onClick={() => skipTrackHandler("skipForward")} icon={faAngleDoubleRight}/>
            </div>
        </div>
    )
}

export default Player;
