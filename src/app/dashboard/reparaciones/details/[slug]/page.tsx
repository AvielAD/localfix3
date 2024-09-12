'use client'

import { ReparacionAllDto, ReparacionTicket } from "@/DTOS/reparaciones/reparacion"
import useSWR from "swr"
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import ComponentNota from '@/Components/NotaLocalFix/page'
import { useRef } from "react"
import { empresadto } from "@/DTOS/empresa/empresa.dto"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { Grid } from "@mui/material"

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
        <Grid container rowSpacing={1} columns={12}>
            <Grid xs={12} md={6} lg={6}>
                <h2>Cliente</h2>
                <p> <strong>Nombre</strong> : {allInfo?.nameClient}</p>
                <p> <strong>Apellido</strong>: {allInfo?.lastNameClient}</p>
                <p> <strong>Telefono</strong>: {allInfo?.phoneNumberClient}</p>

            </Grid>
            <Grid xs={12} md={6} lg={6}>
                <h2>Equipo</h2>
                <p><strong>Marca</strong>: {allInfo?.brand}</p>
                <p> <strong>Modelo</strong>: {allInfo?.model}</p>

            </Grid>
            <Grid xs={12} md={6} lg={6}>
                <h2>Costo</h2>
                <p><strong>Presupuesto</strong> : ${allInfo?.budget} mxn</p>
                <p> <strong>Costo Total</strong>: ${allInfo?.total} mxn</p>

            </Grid>

            <Grid xs={12} md={6} lg={6}>
                <p> <strong>Recepcion</strong>: {FormatMedDate(allInfo?.dateReception)}</p>
                <p> <strong>Entrega</strong>: {FormatMedDate(allInfo?.dateDelivery)}</p>

            </Grid>
            <Grid xs={12} md={6} lg={6}>
                <p> <strong>Falla</strong> {allInfo?.failureDevice}</p>
                <p> <strong>Recomendacion</strong> {allInfo?.diagnosticDevice}</p>

            </Grid>
            <Grid xs={12} md={6} lg={6}>
                <button className="btn btn-primary" onClick={handlePrint}>
                    <i style={{ fontSize: '2rem' }} className="bi bi-printer">Ticket</i>
                </button>

            </Grid>
        </Grid>



    </>)
}

export default Details