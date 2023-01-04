import { useState } from "react";
import { SoundList } from "./SoundList";
import { SoundSearch } from "./SoundSearch";

export const SoundContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <SoundSearch setterFunction={setSearchTerms} />
        <SoundList searchTermState={searchTerms}/>
    </>
}