import styles from './styles.module.scss'
import imgWhatsapp from './assets/WB.jpeg'
import Image from 'next/image'
import { ReparacionTicket } from '@/DTOS/reparaciones/reparacion'
import React from 'react'

const Page = React.forwardRef<HTMLDivElement, ReparacionTicket>((
  {
    costoTotal, 
    modeloEquipo, 
    descripcionReparacion, 
    descripcionFalla, 
    fechaEntrega,
    fechaRecepcion,
    nombreCliente,
    telCliente
  }: ReparacionTicket, ref) => {


  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.containerContent}>
        <div>
          <h1 className={styles.mainTitle}>LocalFix</h1>
          <p>Reparacion de celulares y computadoras</p>
          <p>14 sur 6715 local A. Puebla Puebla</p>
          <p> Fecha Recepcion: {fechaRecepcion}</p>
          <p> Fecha Entrega Aprox.: {fechaEntrega}</p>
        </div>

        <div className={styles.formularioCliente}>
          <p>Datos Cliente</p>
          <p>Nombre: {nombreCliente}</p>
          <p>Telefono: {telCliente}</p>
        </div>

        <div className={styles.formularioCliente}>
          <p className='font-weight-bold'>Datos Dispositivo</p>
          <p >Modelo: {modeloEquipo}</p>
          <p>Falla Presentada:</p>
          <textarea name="areaPres1" id="areaPres1" cols={30} rows={4} defaultValue={descripcionFalla}></textarea>
        </div>

        <div className={styles.formularioCliente}>
          <p>Prespuesto / Costo Reparacion</p>
          <p>total: ${costoTotal} mxn</p>
          <textarea name="areaPres" id="areaPres" cols={30} rows={4} defaultValue={descripcionReparacion}></textarea>
        </div>



        <div>
          <h5><i className="bi bi-browser-safari"></i> www.localfix.mx</h5>
          <h4><i className="bi bi-whatsapp"></i> 2229713533</h4>
        </div>

       
      </div>
    </div>
  )
})
Page.displayName='NotaLocalFix'

export default Page
