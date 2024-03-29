import { Link, useNavigate } from "react-router-dom"


export const UserBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="bg-amber-200">
        <div className="px-20 mx-auto border border-red-400">
            <div className="flex justify-between">
    <li className="navbar__item active">
        <Link className="navbar__link" to="/">Sound Feed</Link>
    </li>
    <li className="navbar__item active">
        <Link className="navbar__link" to="/usersounds">My Sounds</Link>
    </li>
    <li className="navbar__item active">
        <Link className="navbar__link" to="/upload">Upload</Link>
    </li>
    <li className="navbar__item navbar__logout">
        <Link className="navbar__link" to="" onClick={() => {
            localStorage.removeItem("sound_user")
            navigate("/", {replace: true})
        }}>Logout</Link>
    </li>
        </div>
    </div>
</ul>
    )
}