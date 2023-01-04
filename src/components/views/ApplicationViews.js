import { StaffViews } from "./StaffViews"
import { UserViews } from "./UserViews"

export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        return <StaffViews />
    }
    else {
        return <UserViews />
    }
}

