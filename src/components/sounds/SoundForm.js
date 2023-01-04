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
    <h2 className="flex justify-center text-2xl font-bold py-6">New Song</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="title" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black">Song Title:</label>
            <div className="flex justify-center">
            <input
                required autoFocus
                type="text"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="genre" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black">Genre:</label>
            <div className="flex justify-center">
            <input
                required autoFocus
                type="text"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="bpm" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black">BPM:</label>
            <div className="flex justify-center">
            <input
                required autoFocus
                type="number"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="key" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black">Key:</label>
            <div className="flex justify-center">
            <input
                required autoFocus
                type="text"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            </div>
        <div className="form-group">
            <label htmlFor="file" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black">Select File: </label>
            <div className="flex justify-center">
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
        </div>
    </fieldset>
    <div className="flex justify-center">
    <button 
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
        Submit Song
    </button>
    </div>
</form>
)
            }