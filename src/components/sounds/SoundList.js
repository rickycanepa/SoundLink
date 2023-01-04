import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const SoundList = ({ searchTermState }) => {
    const [sounds, setSounds] = useState([])
    const navigate = useNavigate()


const localSoundUser = localStorage.getItem("sound_user")
const soundUserObject = JSON.parse(localSoundUser)

useEffect(
    () => {
        const searchedSounds = sounds.filter(sound => {
            return sound.songTitle.toLowerCase().startsWith(searchTermState.toLowerCase())
        })

        setSounds(searchedSounds)
    },
    [ searchTermState ]
)

useEffect(
    () => {
        fetch("http://localhost:8088/sounds?_expand=user")
        .then(res => res.json())
        .then((fetchedSounds) => {
            setSounds(fetchedSounds)
        })
    },
    []
)

return(<>
<h2>Sound Feed</h2>

<article className="sounds">
    {
        sounds.map(sound => {
            return <section className="sound" key={sound.id}>
                <header>Title: {sound.songTitle}</header>
                <p>Artist: {sound?.user?.fullName} </p>
                <p>BPM: {sound.bpm}</p>
                <p>Genre: {sound.genre}</p>
                <audio controls src={sound.audioURL} type="audio">
                </audio>
                </section>
        })
    }
</article>
</>)
}