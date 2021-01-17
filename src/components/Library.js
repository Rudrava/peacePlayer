import LibrarySong from "./LibrarySong"

const Library = ({songs,setSongs, setCurrentSong, isPlaying, audioRef, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? "active":""}`} >
            <h1>Library</h1>
            <div className="librarySongs">
                {songs.map(song =>  <LibrarySong key={song._id} id={song._id} song={song} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} audioRef={audioRef}/>)}
            </div>
        </div>
    )
}

export default Library
