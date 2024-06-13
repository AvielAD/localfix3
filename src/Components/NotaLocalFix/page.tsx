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
    telCliente,
    nombreEmpresa,
    descripcionEmpresa,
    direccionEmpresa,
    telefonoEmpresa,
    webEmpresa
  }: ReparacionTicket, ref) => {


  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.containerContent}>
        <div style={{lineHeight: '1rem'}}>
          <h1 className={styles.mainTitle}>{nombreEmpresa}</h1>
          <p>{descripcionEmpresa}</p>
          <p>{direccionEmpresa}</p>
          <p> Fecha Recepcion: {fechaRecepcion}</p>
          <p> Fecha Entrega Aprox.: {fechaEntrega}</p>
        </div>

        <div className={styles.formularioCliente} style={{lineHeight: '0.5rem'}}>
          <p>Datos Cliente</p>
          <p>Nombre: {nombreCliente}</p>
          <p>Telefono: {telCliente}</p>
        </div>

        <div className={styles.formularioCliente} >
          <p className='font-weight-bold'>Datos Dispositivo</p>
          <p >Modelo: {modeloEquipo}</p>
          <p>Falla Presentada:</p>
          <textarea name="areaPres1" id="areaPres1" cols={30} rows={5} defaultValue={descripcionFalla}></textarea>
        </div>

        <div className={styles.formularioCliente}>
          <p>Prespuesto / Costo Reparacion</p>
          <p>total: ${costoTotal} mxn</p>
          <textarea name="areaPres" id="areaPres" cols={30} rows={5} defaultValue={descripcionReparacion}></textarea>
        </div>



        <div>
          <h5><i className="bi bi-browser-safari"></i> {webEmpresa}</h5>
          <h4><i className="bi bi-whatsapp"></i> {telefonoEmpresa}</h4>
        </div>

       
      </div>
    </div>
  )
})
Page.displayName='NotaLocalFix'

export default Page
