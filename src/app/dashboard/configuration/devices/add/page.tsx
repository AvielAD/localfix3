'use client'
import FormDeviceAdd from '@/application/devices/forms/deviceadd.form'
import { DeviceInputDto } from '@/DTOS/equipos/devices'
import { postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner, Toast, useToast } from '@avielad/componentspublish'
import { useRouter } from 'next/navigation'

const Page = () => {
    const toast = useToast()
    const router = useRouter()

    const SubmitValues = (values: DeviceInputDto) => {
        
        postFetcher('/api/equipos', values).then((data)=>{
            if (data.succeeded) { 
                const timerToast = setInterval(() => {
                    router.back()
                    clearInterval(timerToast)
                }, 1000);
            }
            toast.changeToast({ Message: data.message, Succedded: data.succeeded })
        })
    }
    return (<>
        <div className="max-w-(--breakpoint-xl) mx-auto">
            <Toast Show={toast.toast.show} ServerMessage={toast.toast.response}></Toast>
            <BarBanner title={{ message: "Nuevo Dispositivo", icon: "bi bi-calculator-fill" }}></BarBanner>
            <FormDeviceAdd OnSubmit={SubmitValues}></FormDeviceAdd>
        </div>
    </>)
}

export default Page