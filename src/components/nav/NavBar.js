import { useNavigate } from "react-router-dom"
import { StaffBar } from "./StaffNav"
import { UserBar } from "./UserNav"


export const NavBar = () => {
    const navigate = useNavigate()

    const localSoundUser = localStorage.getItem("sound_user")
    const soundUserObject = JSON.parse(localSoundUser)

    if (soundUserObject.staff) {
        return <StaffBar />
    }
    else {
        return <UserBar />
    }
}

