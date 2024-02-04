'use client'

import { ReparacionAllDto } from "@/DTOS/reparaciones/reparacion"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Details = ({ params }: { params: { slug: string } }) => {
    let allInfo = {} as ReparacionAllDto
    const uuid = params.slug
    const reparacionDetail = useSWR(`/api/reparaciones/${uuid}`, fetcher)
    if (!reparacionDetail.data) return <>loading...</>
    if(reparacionDetail.data) allInfo = reparacionDetail.data

    return (<>
        <h2>Detalles</h2>

        <div className="row">
            <div className="col-6">
                <h2>Cliente</h2>
                <p>Nombre: {allInfo?.nombre}</p>
                <p>Apellido: {allInfo?.apellido}</p>
                <p>Telefono: {allInfo?.telefono}</p>
            </div>

            <div className="col-6">
                <h2>Equipo</h2>
                <p>Marca: {allInfo?.marca}</p>
                <p>Modelo: {allInfo?.modelo}</p>

            </div>

        </div>
        <div className="row">
            <div className="col-8">
                <h2>Reparacion</h2>
                <p>Recepcion: {allInfo?.recepcion.toString()}</p>
                <p>Entrega: {allInfo?.entrega.toString()}</p>
            </div>

            <div className="col-4 text-justify">
                <h2>Costo</h2>
                <p>Presupuesto Inicial: ${allInfo?.presupuesto} mxn</p>
                <p>Costo Total: ${allInfo?.total} mxn</p>

            </div>

        </div>
        <div className="row">
            <h2>Seguimiento</h2>
            <div className="col">
                <p> Falla Reportada: {allInfo?.falla}</p>
                <p> Acciones a Resolver: {allInfo?.diagnostico}</p>
            </div>
        </div>

    </>)
}

export default Details