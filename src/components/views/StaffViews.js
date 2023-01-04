import { Outlet, Route, Routes } from "react-router-dom"
import { SoundEdit } from "../sounds/EditSounds"
import { MySounds } from "../sounds/MySounds"
import { SoundContainer } from "../sounds/SoundContainer"
import { SoundForm } from "../sounds/SoundForm"
import { UserList } from "../sounds/UserList"


export const StaffViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="py-32 text-center font-extrabold text-4xl bof">SoundLink</h1>

                    <Outlet />
                </>
            }>
                
                <Route path="/" element={ <SoundContainer /> } />
                <Route path="/upload" element={ <SoundForm />} />
                <Route path="/usersounds" element={ <MySounds />} />
                <Route path="/edit/:soundId" element={ <SoundEdit /> } />
                <Route path="/userlist" element={ <UserList /> } />
            </Route>
        </Routes>
    )
}