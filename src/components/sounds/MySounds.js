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
        <h2>Sound Feed</h2>
        
        <article className="sounds">
            {
                sounds.map(sound => {
                    return <section className="sound" key={sound.id}>
                        <header>Title: {sound.songTitle}</header>
                        <p>BPM: {sound.bpm}</p>
                        <p>Genre: {sound.genre}</p>
                        <audio controls src={sound.audioURL} type="audio">
                        </audio>
                        <button onClick={() => handleClick(sound)}>Delete</button>
                        <button className="edit" onClick={() => navigate(`/edit/${sound.id}`)}>Edit Sound</button>
                        </section>
                })
            }
        </article>
        </>)
}