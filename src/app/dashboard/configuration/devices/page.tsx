'use client'
import useSWR from "swr"
import TableDevice from '@/components/tablas/table_device'
import FormDevice from '@/components/formularios/device_update'
import { BarBanner, Modal, Toast, useToast } from "@avielad/componentspublish"
import { DevicesAssignDto, DevicesAssignInputDto, InfoModalDevice } from "@/DTOS/equipos/devices"
import { useState } from "react"
import { putFetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import Link from "next/link"
const fetcher = (url: string) => fetch(url).then(r => r.json())
const Devices = () => {

    const [showModalDevice, setShowModalDevice] = useState({ show: false, info: null } as InfoModalDevice)
    const diagnosticosData = useSWR('/api/equipos/assign', fetcher)
    const Toast1 = useToast();

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

    return (<>
        <div className="max-w-screen-lg mx-auto text-black">
            <Modal show={showModalDevice.show} close={() => setShowModalDevice({ show: false, info: null })}>
                <FormDevice values={showModalDevice.info} setValues={Submit}></FormDevice>
            </Modal>

            <Toast Show={Toast1.toast.show} ServerMessage={Toast1.toast.response}></Toast>
            <li className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link href={'/dashboard/configuration/devices/add'}>Agregar Dispositivo</Link>
            </li>
            <BarBanner title="Asignacion de Dispositivos" starmessage="Filtrado" arrowmessage=""></BarBanner>
            <TableDevice elements={diagnosticosData.data} Open={OpenModal}></TableDevice>
        </div>
    </>)
}

export default Devices