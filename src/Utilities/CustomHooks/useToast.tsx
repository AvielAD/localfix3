import { useEffect, useState } from "react"
import { ToastDto } from "./Dtos/Toast.dto"
import { ServerResponseDto } from "./Dtos/ServerResponse.dto"

const useToast = () => {
    const [toast, setToast] = useState({ show: false, response: { Message: "", Succedded: false } } as ToastDto)

    const changeToast = (data: ServerResponseDto) => {
        setToast({
            show: true,
            response: data
        } as ToastDto)

        const timer = setInterval(() => {
            setToast({
                show: false,
                response: {
                    Message: "",
                    Succedded: false
                } as ServerResponseDto
            } as ToastDto)
            clearInterval(timer)
        }, 3000)
    }
    return {
        toast,
        changeToast
    }

}

export default useToast