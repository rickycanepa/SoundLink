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
<h2 className="py-32 text-center font-extrabold text-4xl bof">User List</h2>

<article className="flex justify-center">
    {
        users.map(user => {
            return <section className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-g" key={user.id}>
                <header className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">User: {user.fullName}</header>
                <p className="font-normal text-white dark:text-white">Email: {user.email} </p>
                <button className="font-normal text-white dark:text-white" onClick={() => handleClick(user)}>Ban</button>
                </section>
        })
    }
</article>
</>)
}