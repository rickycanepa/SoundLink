import { useState } from "react";
import { SoundList } from "./SoundList";
import { SoundSearch } from "./SoundSearch";

export const UserSoundContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <SoundSearch setterFunction={setSearchTerms} />
        <SoundList searchTermState={searchTerms}/>
    </>
}