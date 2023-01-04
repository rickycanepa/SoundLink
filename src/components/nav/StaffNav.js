import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const StaffBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Sound Feed</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/usersounds">My Sounds</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/upload">Upload</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/userlist">User List</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("sound_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}