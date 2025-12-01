'use client'
import useSWR from "swr"
import TableDevice from '@/application/devices/table/device.table'
import FormDevice from '@/application/devices/forms/deviceupdate.form'
import { BarBanner, Modal, Toast, useToast } from "@avielad/componentspublish"
import { DevicesDto, DeviceUpdateInputDto } from "@/application/devices/dtos/devices.dto"
import { useState } from "react"
import { fetcher, putFetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { useRouter } from "next/navigation"

export interface InfoModalDevice {
    show: boolean,
    info: DevicesDto | null
}
const Devices = () => {
    const [showModalDevice, setShowModalDevice] = useState({ show: false, info: null } as InfoModalDevice)
    const diagnosticosData = useSWR('/api/equipos/popular', fetcher)
    const Toast1 = useToast();
    const router = useRouter()

    if (!diagnosticosData.data) return <>loading...</>

    const OpenModal = (item: DevicesDto) => {
        setShowModalDevice({ show: true, info: item })
    }

    const Submit = (item: DeviceUpdateInputDto) => {
        putFetcher('/api/equipos', item).then(data => {
            Toast1.changeToast({ Message: data.message, Succedded: data.succeeded })
            if (data.succeeded) {
                setShowModalDevice({ show: false, info: null })
                diagnosticosData.mutate()
            }
        })
    }
    const ActionButton = {
        action: () => { router.push(`/dashboard/configuration/devices/add`) },
        title: "Nuevo",
        icon: "bi bi-clipboard2-plus",
        disabled: false
    }
    return (<>
        <div className="">
            <Modal show={showModalDevice.show} close={() => setShowModalDevice({ show: false, info: null })}>
                <FormDevice values={showModalDevice.info} setValues={Submit}></FormDevice>
            </Modal>

            <Toast Show={Toast1.toast.show} ServerMessage={Toast1.toast.response}></Toast>

            <BarBanner button={ActionButton} title={{ message: "Nuevo Dispositivo", icon: "bi bi-calculator-fill" }} buttonback={{ action: () => router.back() }} ></BarBanner>
            <TableDevice
                elements={diagnosticosData.data}
                Open={OpenModal}
            ></TableDevice>
        </div>
    </>)
}

export default Devices