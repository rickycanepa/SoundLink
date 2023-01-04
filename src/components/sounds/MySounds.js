import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const MySounds = () => {
    
    const [sounds, setSounds] = useState([])

    const navigate = useNavigate()
    const localSoundUser = localStorage.getItem("sound_user")
    const soundUserObject = JSON.parse(localSoundUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/sounds`)
            .then(response => response.json())
            .then((soundArray) => {
                
              const userSounds = soundArray.filter(sound => 
                {
                  return sound.userId === soundUserObject.id
                }
              )
              setSounds(userSounds)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )
    
    const handleClick = (sound) => {
        fetch(`http://localhost:8088/sounds/${sound.id}`, {
            method: 'DELETE'
        }).then(() => {
            fetch(`http://localhost:8088/sounds`)
            .then(response => response.json())
            .then((soundArray) => {
                
              const userSounds = soundArray.filter(sound => 
                {
                  return sound.userId === soundUserObject.id
                }
              )
              setSounds(userSounds)
            })
        })
    }


    return(<>
        <h2 className="py-32 text-center font-extrabold text-4xl bof">My Sounds</h2>
        
        <article className="flex justify-center">
            {
                sounds.map(sound => {
                    return <section className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-g" key={sound.id}>
                        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Title: {sound.songTitle}</h3>
                        <p className="font-normal text-white dark:text-white">BPM: {sound.bpm}</p>
                        <p className="font-normal text-white dark:text-white">Genre: {sound.genre}</p>
                        <audio controls src={sound.audioURL} type="audio">
                        </audio>
                        <button  className="px-5 font-normal text-white dark:text-white" onClick={() => handleClick(sound)}>Delete</button>
                        <button className="px-5 font-normal text-white dark:text-white" onClick={() => navigate(`/edit/${sound.id}`)}>Edit Sound</button>
                        </section>
                })
            }
        </article>
        </>)
}