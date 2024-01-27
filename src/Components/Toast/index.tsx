'use client'
import { toastpersonal } from "@/DTOS/toast/toast"
const Index = (props: toastpersonal) => {
    return (<>
        <div className={`z-1 ${props.succedded ? 'bg-success': 'bg-danger'} rounded-3 w-sm-50 w-md-25 p-2`}>
            <div>
                <div className="text-white">
                    Advertencia
                </div>
                <div className="text-white">
                    {props.message}
                </div>
            </div>

        </div>
    </>)
}

export default Index