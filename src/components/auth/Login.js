import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"


export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("sound_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="py-32 text-center font-extrabold text-4xl bof">SoundLink</h1>
                    <h2 className="py-32 text-center font-extrabold text-4xl bof">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail" className="flex justify-center block mb-2 text-lg font-medium text-gray-900 dark:text-black"> Email address </label>
                        <div className="flex justify-center">
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Email address"
                            required autoFocus />
                            </div>
                    </fieldset>
                    <fieldset className="flex justify-center">
                        <button type="submit" className="flex justify-center">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="flex justify-center">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

