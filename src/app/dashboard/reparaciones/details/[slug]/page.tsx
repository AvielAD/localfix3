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


        <div className="d-none">

            <ComponentNota ref={componentRef}
                nombreCliente={allInfo?.nameClient + " " + allInfo?.lastNameClient}
                telCliente={allInfo?.phoneNumberClient}
                modeloEquipo={allInfo?.brand + " " + allInfo?.model}
                fechaRecepcion={allInfo?.dateReception?.toString().split("T")[0]}
                fechaEntrega={allInfo?.dateDelivery?.toString().split("T")[0]}
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



    </>)
}

export default Details