'use client'

import { ReparacionAllDto, ReparacionTicket } from "@/DTOS/reparaciones/reparacion"
import useSWR from "swr"
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import ComponentNota from '@/Components/NotaLocalFix/page'
import { useRef } from "react"
import { empresadto } from "@/DTOS/empresa/empresa.dto"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Details = ({ params }: { params: { slug: string } }) => {
    let allInfo = {} as ReparacionAllDto
    let empresaInfo = {} as empresadto
    const uuid = params.slug
    const reparacionDetail = useSWR(`/api/reparaciones/${uuid}`, fetcher)
    const empresaData = useSWR(`/api/empresa`, fetcher)

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    if (!reparacionDetail.data) return <>loading...</>
    if (reparacionDetail.data) allInfo = reparacionDetail.data
    if (empresaData.data) empresaInfo = empresaData.data

    return (<>


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
                <button onClick={handlePrint} className="rounded-md flex items-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"><i className="mr-2 bi bi-printer"></i> Imprimir Ticket</button>

                <h2 className="font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{allInfo.model} {allInfo.brand} </h2>
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5"> ${allInfo.total} mxn</h6>


                <p className="text-gray-500 text-base font-normal mb-5">
                    <h2 className='py-2 font-bold'>Diagnostico</h2>

                    {allInfo.failureDevice}
                </p>

                <p className="text-gray-500 text-base font-normal mb-5">
                    <h2 className='py-2 font-bold'>Reparacion</h2>

                    {allInfo.diagnosticDevice}
                </p>
                <div >
                    <p className="flex justify-between">
                        <span>Fecha Recepcion</span>
                        <span>{ FormatMedDate(allInfo.dateReception)} </span>
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