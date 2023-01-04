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
<h2 className="py-32 text-center font-extrabold text-4xl bof">Sound Feed</h2>

<article className="flex justify-center">
    {
        sounds.map(sound => {
            return <section className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-g" key={sound.id}>
                <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{sound.songTitle}</div>
                <p className="font-normal text-white dark:text-white">Artist: {sound?.user?.fullName} </p>
                <p className="font-normal text-white dark:text-white">BPM: {sound.bpm}</p>
                <p className="font-normal text-white dark:text-white">Genre: {sound.genre}</p>
                <audio controls src={sound.audioURL} type="audio">
                </audio>
                </section>
        })
    }
</article>
</>)
}