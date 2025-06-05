'use client'

import { ReparacionAllDto } from "@/DTOS/reparaciones/reparacion"
import useSWR from "swr"
import { useReactToPrint } from 'react-to-print'
import ComponentNota from '@/components/notalocalfix'
import { use, useRef, useState } from "react"
import { empresadto } from "@/DTOS/empresa/empresa.dto"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { putFetcher, fetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { TreeDto, TreeStates } from '@/UtilitiesLocal/StateChange'
import { Toast, useToast } from "@avielad/componentspublish"
import { BarBanner } from "@avielad/componentspublish"

type DetailsProps = Promise<{ slug: string }>

const Details = (props: { params: DetailsProps }) => {
    const params = use(props.params)
    const uuid = params.slug

    const reparacionDetail = useSWR(`/api/reparaciones/${uuid}`, fetcher)
    const empresaData = useSWR(`/api/empresa`, fetcher)
    const [dropdown, setdropDown] = useState(false)
    const { toast, changeToast } = useToast()

    let allInfo = {} as ReparacionAllDto
    let empresaInfo = {} as empresadto
    let TreeState = {} as TreeDto | undefined

    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef })

    if (!reparacionDetail.data) return <>loading...</>
    if (reparacionDetail.data) allInfo = reparacionDetail.data
    if (empresaData.data) empresaInfo = empresaData.data

    const changeState = (newstate: TreeDto) => {

        putFetcher(`/api/reparaciones/${uuid}/${newstate.index}`, {}).then(data => {

            changeToast({ Message: data.message, Succedded: data.succedded })
            reparacionDetail.mutate()
            setdropDown(false)
        })
    }
    if (reparacionDetail.data) {
        TreeState = TreeStates.find(x => x.name == allInfo.estado.nombre)
    }

    return (
        <>

            <Toast Show={toast.show} ServerMessage={{ ...toast.response }}></Toast>

            <div className="hidden">

                <ComponentNota ref={contentRef}
                    nombreCliente={allInfo?.nameClient + " " + allInfo?.lastNameClient}
                    telCliente={allInfo?.phoneNumberClient}
                    modeloEquipo={allInfo?.brand + " " + allInfo?.model}
                    fechaRecepcion={allInfo?.dateReception}
                    fechaEntrega={allInfo?.dateDelivery}
                    descripcionFalla={allInfo?.failureDevice}
                    descripcionReparacion={allInfo?.diagnosticDevice}
                    costoTotal={parseInt(allInfo?.total)}
                    nombreEmpresa={empresaInfo.nombre}
                    descripcionEmpresa={empresaInfo.descripcion}
                    direccionEmpresa={empresaInfo.direccion}
                    telefonoEmpresa={empresaInfo.telefono}
                    webEmpresa={empresaInfo.web}
                ></ComponentNota>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[70%,30%] max-w-screen-2xl mx-auto gap-2">
                <div className="order-2 md:order-1">
                    <BarBanner title={{ message: `${allInfo.brand} ${allInfo.model}`, icon: "bi bi-cart4" }} messages={[
                        { title: "Fecha de Entrega", message: ` ${FormatMedDate(allInfo.dateReception)}` },
                        { title: "Fecha de Recepcion", message: ` ${FormatMedDate(allInfo.dateReception)}` },
                        { title: "Costo Reparacion", message: `$ ${allInfo.budget} mxn` },
                        { title: "Estado", message: ` ${TreeStates.find(x => x.name == allInfo.estado.nombre)?.trad}` }
                    ]}></BarBanner>
                    <div className="rounded-lg border border-secondary-200 bg-white shadow-sm">
                        <div className="px-6 py-4 border-b border-secondary-200">
                            <h3 className="text-lg font-medium">Detalles del Servicio</h3>
                            <p className="text-sm text-secondary-500">{}</p>
                        </div>
                        <div className="px-6 py-4">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-secondary-500">Diagnostico</h3>
                                    <p className="mt-1">{allInfo.failureDevice}</p>
                                </div>

                                <div className="h-px bg-secondary-200"></div>

                                <div className="h-px bg-gray-200"></div>

                                <div>
                                    <h3 className="text-sm font-medium text-secondary-500">Servicio a realizar</h3>
                                    <p className="mt-1 text-sm">{allInfo.diagnosticDevice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 grid grid-rows-2">
                    <div className="flex justify-around items-center row-span-1">
                        <div className="relative inline-block text-left ">
                            <button onClick={handlePrint}
                                className="rounded-lg shadow-md p-2 ring-1 ring-theme1-500">Imprimir Ticket <i className="ml-2 bi bi-printer"></i> </button>
                        </div>

                        <div className="relative inline-block text-left">
                            <button disabled={TreeState?.value.length ?? 0 == 0 ? false : true} onClick={() => setdropDown(!dropdown)}
                                className="rounded-lg shadow-md p-2 ring-1 ring-theme1-500">Cambiar Estado <i className="bi bi-arrow-down"></i></button>
                            <div className={`absolute ${dropdown ? "visible" : "invisible"} z-10 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                                <div className="py-1">
                                    {
                                        TreeState?.value.map((item: string, index) => (
                                            <button onClick={() => changeState(TreeStates.find(x => x.name == item) as any)} key={index} className="w-full rounded-lg block px-4 py-2 text-sm text-gray-700 hover:bg-success-200 hover:text-success-700">{item}</button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-secondary-200 bg-white shadow-sm">
                        <div className="px-3 border-b border-secondary-200">
                            <h3 className="text-lg font-medium">Cliente</h3>
                        </div>
                        <div className="px-6 py-4">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 rounded-full bg-secondary-200 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600">
                                            {allInfo.nameClient
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{allInfo.nameClient} {allInfo.lastNameClient}</h3>
                                    </div>
                                </div>

                                <div className="h-px bg-secondary-200"></div>

                                <div className="space-y-2">

                                    <div className="flex items-center gap-2">
                                        <i className="bi bi-telephone-fill"></i>
                                        <span className="text-sm">{allInfo.phoneNumberClient}</span>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>)
}

export default Details