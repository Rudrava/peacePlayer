import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

const Player = () => {
    return (
        <div className="player">
            <div className="timeControl">
                <p>Start Time</p>
                <input type="range"/>
                <p>End Time</p>
            </div>
            <div className="playControl">
                <FontAwesomeIcon className="skipBack" icon={faAngleDoubleLeft}/>
                <FontAwesomeIcon className="play" icon={faPlay}/>
                <FontAwesomeIcon className="skipForward" icon={faAngleDoubleRight}/>
            </div>
        </div>
    )
}

export default Player;
