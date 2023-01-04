import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const SoundEdit = () => {
    const [sounds, setSounds] = useState({
        songTitle: "",
        audioURL: "",
        genre: "",
        bpm: "",
        key: ""
    })
    const { soundId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8088/sounds/${soundId}`)
            .then(response => response.json())
            .then((data) => {
                setSounds(data)
            })
    }, [soundId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/sounds/${sounds.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sounds)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/usersounds")
            })
    }


    return     <form className="soundForm">
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
    </fieldset>
    <div className="flex justify-center">
    <button 
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
        Save Edits
    </button>
    </div>
</form>

}