export const playAudio = (isPlaying, audioRef) => {
    if(isPlaying){

        var playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                audioRef.current.play()
            })
            .catch(error => {
                // this handles the play DOMexception working for auto  skip on song end
                audioRef.current.play()
            });
        }
    }
}