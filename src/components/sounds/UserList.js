import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const UserList = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()


const localSoundUser = localStorage.getItem("sound_user")
const soundUserObject = JSON.parse(localSoundUser)

useEffect(
    () => {
        fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then((fetchedUsers) => {
            setUsers(fetchedUsers)
        })
    },
    []
)

const handleClick = (user) => {
    fetch(`http://localhost:8088/users/${user.id}`, {
        method: 'DELETE'
    }).then(() => {
        fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then((fetchedUsers) => {
            setUsers(fetchedUsers)
        })
    })
}

return(<>
<h2>Users List</h2>

<article className="users">
    {
        users.map(user => {
            return <section className="user" key={user.id}>
                <header>User: {user.fullName}</header>
                <p>Email: {user.email} </p>
                <button onClick={() => handleClick(user)}>Ban</button>
                </section>
        })
    }
</article>
</>)
}