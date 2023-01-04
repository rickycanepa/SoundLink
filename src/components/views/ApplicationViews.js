import { StaffViews } from "./StaffViews"
import { UserViews } from "./UserViews"

export const ApplicationViews = () => {
	
    const localSoundUser = localStorage.getItem("sound_user")
    const soundUserObject = JSON.parse(localSoundUser)

    if (soundUserObject.staff) {
        return <StaffViews />
    }
    else {
        return <UserViews />
    }
}

