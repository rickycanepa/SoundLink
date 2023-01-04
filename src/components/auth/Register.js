import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("sound_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="py-32 text-center font-extrabold text-4xl bof">Please Register for SoundLink</h1>
                <fieldset>
                    <label htmlFor="fullName" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black"> Full Name </label>
                    <div className="flex justify-center">
                    <input onChange={updateUser}
                           className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           type="text" id="fullName"
                           placeholder="Enter your name" required autoFocus />
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="email" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black"> Email address </label>
                    <div className="flex justify-center">
                    <input onChange={updateUser}
                        className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="email" id="email"
                        placeholder="Email address" required />
                        </div>
                </fieldset>
                <fieldset>
                <label htmlFor="email" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black"> I am an employee </label>
                    <div className="flex justify-center">
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isStaff = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isStaff"  />
                        </div>
                    
                </fieldset>
                <fieldset>
                    <div className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black">
                    <button type="submit"> Register </button>
                    </div>
                </fieldset>
            </form>
    )
}

