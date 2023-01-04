import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from 'axios'

export const SoundForm = () => {
    const [sounds, setSounds] = useState({
        songTitle: "",
        audioURL: "",
        genre: "",
        bpm: "",
        key: ""
    })

    const navigate = useNavigate()

    const localSoundUser = localStorage.getItem("sound_user")
    const soundUserObject = JSON.parse(localSoundUser)
    const [audioSelected, setAudioSelected] = useState("")

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const formData = new FormData()

        formData.append("file", audioSelected)
        formData.append("upload_preset", "qoaxpwnx")
    
    Axios.post("https://api.cloudinary.com/v1_1/dwa5ugu9a/video/upload", formData)
        .then(response => {
            const soundToSendToAPI = {
                userId: soundUserObject.id,
                songTitle: sounds.songTitle,
                audioURL: response.data.url,
                genre: sounds.genre,
                bpm: sounds.bpm,
                key: sounds.key
            }
        



    return fetch(`http://localhost:8088/sounds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(soundToSendToAPI)
    
    })
        .then(response => response.json())
        .then(() => {
            navigate("/")
        })

    
        })
    }

     return (
    <form className="soundForm">
    <h2 className="soundForm__title">New Song</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="title">Song Title:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Song Title"
                value={sounds.songTitle}
                onChange={
                    (evt) => {
                        const copy = {...sounds}
                        copy.songTitle = evt.target.value
                        setSounds(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Genre"
                value={sounds.genre}
                onChange={
                    (evt) => {
                        const copy = {...sounds}
                        copy.genre = evt.target.value
                        setSounds(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="bpm">BPM:</label>
            <input
                required autoFocus
                type="number"
                className="form-control"
                placeholder="BPM"
                value={sounds.bpm}
                onChange={
                    (evt) => {
                        const copy = {...sounds}
                        copy.bpm = evt.target.value
                        setSounds(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="key">Key:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Key"
                value={sounds.key}
                onChange={
                    (evt) => {
                        const copy = {...sounds}
                        copy.key = evt.target.value
                        setSounds(copy)
                    }
                } />
            </div>
        <div className="form-group">
            <label htmlFor="file">Select File: </label>
            <input
                required autoFocus
                type="file"
                placeholder="File"
                onChange={
                    (evt) => {
                        setAudioSelected(evt.target.files[0])
                    }
                } />
        </div>
    </fieldset>
    <button 
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
        Submit Song
    </button>
</form>
)
            }