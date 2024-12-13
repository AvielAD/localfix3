'use client'
import FormDeviceAdd from '@/components/formularios/device_add'
import { DeviceInputDto, DeviceInputFormDto } from '@/DTOS/equipos/devices'
import { postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner, Toast, useToast } from '@avielad/componentspublish'
import { useRouter } from 'next/navigation'

const Page = () => {
    const toast = useToast()
    const router = useRouter()
    const SubmitValues = (values: DeviceInputFormDto, { resetForm }: any) => {

        const ChangeValues: DeviceInputDto = {
            idBrand: values.idBrand === "" ? 0 : parseInt(values.idBrand),
            popularModel: values.popularModel,
            model: values.model,
            idCategory: values.idCategory === "" ? 0 : parseInt(values.idCategory)
        }
        
        postFetcher('/api/equipos', ChangeValues).then((data)=>{
            if (data.succeeded) { 
                resetForm()
                const timerToast = setInterval(() => {
                    router.back()
                    clearInterval(timerToast)
                }, 1000);
            }
            toast.changeToast({ Message: data.message, Succedded: data.succeeded })
        })
    }
    return (<>
        <div className="max-w-screen-xl mx-auto">
            <Toast Show={toast.toast.show} ServerMessage={toast.toast.response}></Toast>
            <BarBanner title="Dispositivo" starmessage="Nuevo" arrowmessage=""></BarBanner>
            <FormDeviceAdd OnSubmit={SubmitValues}></FormDeviceAdd>
        </div>
    </>)
}

export default Page