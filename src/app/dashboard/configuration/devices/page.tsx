'use client'
import useSWR from "swr"
import TableDevice from '@/components/tablas/table_device'
import FormDevice from '@/components/formularios/device_update'
import { BarBanner, Modal, Toast, useToast } from "@avielad/componentspublish"
import { DevicesAssignDto, DevicesAssignInputDto, InfoModalDevice } from "@/DTOS/equipos/devices"
import { useState } from "react"
import { putFetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import Link from "next/link"
import { useRouter } from "next/navigation"

const fetcher = (url: string) => fetch(url).then(r => r.json())
const Devices = () => {

    const [showModalDevice, setShowModalDevice] = useState({ show: false, info: null } as InfoModalDevice)
    const diagnosticosData = useSWR('/api/equipos/assign', fetcher)
    const Toast1 = useToast();
    const router = useRouter()

    if (!diagnosticosData.data) return <>loading...</>

    const OpenModal = (item: DevicesAssignDto) => {
        setShowModalDevice({ show: true, info: item })
    }

    const Submit = (item: DevicesAssignInputDto) => {
        putFetcher('/api/equipos/assign', item).then(data => {
            Toast1.changeToast({ Message: data.message, Succedded: data.succeeded })
            setShowModalDevice({ show: false, info: null })
            diagnosticosData.mutate()

        })

    }
    const ActionButton = {
        action: () => { router.push(`/dashboard/configuration/devices/add`) },
        title: "Nuevo",
        icon: "bi bi-clipboard2-plus",
        disabled: false
    }
    return (<>
        <div className="max-w-(--breakpoint-lg) mx-auto text-black">
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