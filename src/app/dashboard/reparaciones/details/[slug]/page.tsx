'use client'

import { ReparacionAllDto } from "@/DTOS/reparaciones/reparacion"
import useSWR from "swr"
import { useReactToPrint } from 'react-to-print'
import ComponentNota from '@/components/NotaLocalFix/page'
import { useRef, useState } from "react"
import { empresadto } from "@/DTOS/empresa/empresa.dto"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { putFetcher, fetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { TreeDto, TreeStates } from '@/UtilitiesLocal/StateChange'
import { Toast, useToast } from "@avielad/componentspublish"

const Details = ({ params }: { params: { slug: string } }) => {
    const [dropdown, setdropDown] = useState(false)
    const { toast, changeToast } = useToast()

    let allInfo = {} as ReparacionAllDto
    let empresaInfo = {} as empresadto
    const uuid = params.slug
    let TreeState = {} as TreeDto | undefined
    const reparacionDetail = useSWR(`/api/reparaciones/${uuid}`, fetcher)
    const empresaData = useSWR(`/api/empresa`, fetcher)

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

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

    return (<>

        <Toast Show={toast.show} ServerMessage={{ ...toast.response }}></Toast>

        <div className="hidden">

            <ComponentNota ref={componentRef}
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

        <div className="flex justify-center items-center h-90">
            <div className="data w-full max-w-xl">
                <div className="flex flex-col">
                    <button onClick={handlePrint} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Imprimir Ticket <i className="ml-2 bi bi-printer"></i> </button>

                    <div className="relative inline-block text-left mt-5 mb-5">
                        <button disabled={TreeState?.value.length ?? 0 == 0 ? false : true} onClick={() => setdropDown(!dropdown)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> Cambiar Estado <i className="bi bi-arrow-down"></i></button>
                    </div>
                </div>

                <div className={`absolute ${dropdown ? "visible" : "invisible"} z-10 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <div className="py-1">
                        {
                            TreeState?.value.map((item: string, index) => (
                                <button onClick={() => changeState(TreeStates.find(x => x.name == item) as any)} key={index} className="block px-4 py-2 text-sm text-gray-700">{item}</button>
                            ))
                        }
                    </div>
                </div>

                <h2 className="font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{allInfo.model} {allInfo.brand} </h2>
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5"> ${allInfo.total} mxn</h6>
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5"> {TreeStates.find(x => x.name == allInfo.estado.nombre)?.trad} </h6>


                <div className="text-gray-500 text-base font-normal mb-5">
                    <h2 className='py-2 font-bold'>Diagnostico</h2>

                    {allInfo.failureDevice}
                </div>

                <div className="text-gray-500 text-base font-normal mb-5">
                    <h2 className='py-2 font-bold'>Reparacion</h2>

                    {allInfo.diagnosticDevice}
                </div>
                <div >
                    <p className="flex justify-between">
                        <span>Fecha Recepcion</span>
                        <span>{FormatMedDate(allInfo.dateReception)} </span>
                    </p>
                    <p className="flex justify-between">
                        <span>Fecha Entrega</span>
                        <span>{FormatMedDate(allInfo.dateDelivery)} </span>
                    </p>

                </div>
                <div >
                    <h2 className='py-2 font-bold'>Datos Cliente</h2>
                    <p className="flex justify-between">
                        <span>Nombre</span>
                        <span>{allInfo.nameClient} {allInfo.lastNameClient}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Número</span>
                        <span>{allInfo.phoneNumberClient} </span>
                    </p>

                </div>
            </div>
        </div>




    </>)
}

export default Details