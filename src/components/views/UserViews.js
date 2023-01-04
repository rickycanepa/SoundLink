import { UserSoundContainer } from "../sounds/UserSoundContainer"
import { Outlet, Route, Routes } from "react-router-dom"
import { SoundEdit } from "../sounds/EditSounds"
import { MySounds } from "../sounds/MySounds"
import { SoundForm } from "../sounds/SoundForm"

export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>SoundLink</h1>

                    <Outlet />
                </>
            }>
                
                <Route path="/" element={ <UserSoundContainer /> } />
                <Route path="/upload" element={ <SoundForm />} />
                <Route path="/usersounds" element={ <MySounds />} />
                <Route path="/edit/:soundId" element={ <SoundEdit /> } />
            </Route>
        </Routes>
    )
}