import { useState } from "react"

const useModal = ()=>{
    const [show, setShow]= useState(false);
    
    const changeShow=()=>{
        setShow(!show)
    }

    return {
        show,
        changeShow
    }
}

export default useModal