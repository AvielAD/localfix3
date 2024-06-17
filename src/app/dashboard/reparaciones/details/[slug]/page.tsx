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
    
    console.log(allInfo)

    return (<>
        <h2 className="text-center">Detalles</h2>


        <div className="d-none">

            <ComponentNota ref={componentRef}
                nombreCliente={allInfo?.nombre + " " + allInfo?.apellido}
                telCliente={allInfo?.telefono}
                modeloEquipo={allInfo?.marca + " " + allInfo?.modelo}
                fechaRecepcion={allInfo?.recepcion?.toString().split("T")[0]}
                fechaEntrega={allInfo?.entrega?.toString().split("T")[0]}
                descripcionFalla={allInfo?.falla}
                descripcionReparacion={allInfo?.diagnostico}
                costoTotal={parseInt(allInfo?.total)}
                nombreEmpresa={empresaInfo.nombre}
                descripcionEmpresa={empresaInfo.descripcion}
                direccionEmpresa={empresaInfo.direccion}
                telefonoEmpresa={empresaInfo.telefono}
                webEmpresa={empresaInfo.web}
            ></ComponentNota>
        </div>

        <div className="container">

            <div className="row">
                <div className="col-4">
                    <h2>Cliente</h2>
                    <p>Nombre: {allInfo?.nombre}</p>
                    <p>Apellido: {allInfo?.apellido}</p>
                    <p>Telefono: {allInfo?.telefono}</p>
                </div>

                <div className="col-4">
                    <h2>Equipo</h2>
                    <p>Marca: {allInfo?.marca}</p>
                    <p>Modelo: {allInfo?.modelo}</p>

                </div>
                <div className="col-4 text-justify">
                    <h2>Costo</h2>
                    <p>Presupuesto Inicial: ${allInfo?.presupuesto} mxn</p>
                    <p>Costo Total: ${allInfo?.total} mxn</p>

                </div>


            </div>
            <div className="row">
                <div className="col-4">
                    <h2>Reparacion</h2>
                    <p>Recepcion: { FormatMedDate( allInfo?.recepcion)}</p>
                    <p>Entrega: { FormatMedDate( allInfo?.entrega)}</p>
                </div>

                <div className="col-8">
                    <h2>Seguimiento</h2>
                    <p> Falla Reportada: {allInfo?.falla}</p>
                    <p> Acciones a Resolver: {allInfo?.diagnostico}</p>
                </div>

            </div>

            <div className="row">
                <div className="col-4">

                    <h2>Acciones</h2>
                    <button className="btn btn-primary" onClick={handlePrint}>
                        <i style={{ fontSize: '2rem' }} className="bi bi-printer">Ticket</i>
                    </button>
                </div>

            </div>
        </div>

    </>)
}

export default Details