import imgWhatsapp from './assets/WB.jpeg'
import Image from 'next/image'
import { ReparacionTicket } from '@/DTOS/reparaciones/reparacion'
import React from 'react'
import { FormatMedDate, FormatMedDateString } from '@/Utilities/DateTimeHelpers/FormattingDate'

const Page = React.forwardRef<HTMLDivElement, ReparacionTicket>((
  {
    costoTotal,
    modeloEquipo,
    descripcionReparacion,
    descripcionFalla,
    fechaEntrega,
    fechaRecepcion,
    nombreCliente,
    telCliente,
    nombreEmpresa,
    descripcionEmpresa,
    direccionEmpresa,
    telefonoEmpresa,
    webEmpresa
  }: ReparacionTicket, ref) => {


  return (
    <div ref={ref} className="w-[300pt] h-[580pt] p-8">
      <div className=''>
        <h1 className="mx-auto w-16 py-2 font-inspiration text-5xl font-bold">{nombreEmpresa}</h1>
        <div className='flex flex-col justify-center items-center gap-2'>
          <p>{descripcionEmpresa}</p>
          <p>{direccionEmpresa}</p>
        </div>
      </div>
      <div className='flex flex-col gap-3 border-b py-6 text-xs'>
        <p className='flex justify-between'>
          <span>Fecha Recepción</span>
          <span>{FormatMedDate(fechaRecepcion)}</span>
        </p>

        <p className='flex justify-between'>
          <span>Fecha Entrega Aprox..</span>
          <span>{FormatMedDate(fechaEntrega)}</span>
        </p>
      </div>
      <div className=" border-b border border-dashed"></div>
      <div className="">
        <h2 className='py-2 font-bold'>Datos Cliente</h2>
        <p className='flex justify-between'>
          <span>Nombre</span>
          <span>{nombreCliente}</span>
        </p>
        <p className='flex justify-between'>
          <span>Telefono</span>
          <span>{telCliente}</span>
        </p>
      </div>
      <div className=" border-b border border-dashed"></div>
      <div className="" >
        <h2 className='py-2 font-bold'>Datos Dispositivo</h2>
        <p className='flex justify-between'>
          <span>Modelo</span>
          <span>{modeloEquipo}</span>
        </p>
        <p className='flex justify-between'>
          <span>Costo Reparacion</span>
          <span>${costoTotal} mxn</span>
        </p>
      </div>
      <div className=" border-b border border-dashed"></div>
      <div className="">
        <div>
          <p className='py-2 font-bold'>Falla Presentada:</p>
          <span>{descripcionFalla}</span>

        </div>
        <div>
          <p className='py-2 font-bold'>Reparación: </p>
          <span>{descripcionReparacion}</span>
        </div>

      </div>

      <div className='py-4 justify-center items-center flex flex-col gap-2'>
        <h5><i className="bi bi-browser-safari"></i> {webEmpresa}</h5>
        <h4><i className="bi bi-whatsapp"></i> {telefonoEmpresa}</h4>
      </div>
    </div>
  )
})
Page.displayName = 'NotaLocalFix'

export default Page
