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
            <label htmlFor="audioURL">URL:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="URL"
                value={sounds.audioURL}
                onChange={
                    (evt) => {
                        const copy = {...sounds}
                        copy.audioURL = evt.target.value
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
    </fieldset>
    <button 
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
        Save Edits
    </button>
</form>

}