'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { useState } from "react"
import Modal from '@/NewComponents/Modal'
import FormReparacion from '@/NewComponents/Formularios/AddReparacionForm'

const Reparaciones = () => {
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const infoRepairs = useSWR('/api/reparaciones', fetcher)


    if (!infoRepairs.data) return <>loading...</>

    return (<>
        
        <div className="flex justify-center items-center h-90">
            <table className='shadow-2xl rounded-lg w-8/12 overflow-hidden'>
                <thead>
                    <tr className="text-white ml-5">
                        <th className="py-3 bg-gray-800">Equipo</th>
                        <th className="py-3 bg-gray-800">Recepcion</th>
                        <th className="py-3 bg-gray-800">Entrega</th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        infoRepairs.data?.map((item: ReparacionDto, index: number) => {
                            return <tr key={index} onClick={()=>{router.push(`/dashboard/reparaciones/details/${item.uuid}`)}} className="hover:bg-gray-700 hover:text-white cursor-pointer hover:scale-105 duration-300">
                                <td className="py-3 px-6">{item.model + " " + item.brand}</td>
                                <td className="py-3 px-6 text-center">{FormatMedDate(item.dateReception)}</td>
                                <td className="py-3 px-6 text-center">{FormatMedDate(item.dateDelivery)}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        
            <Modal show={showModal} close={()=>setShowModal(false)}>
                    <FormReparacion close={()=>{setShowModal(false); infoRepairs.mutate();}}/>
            </Modal>

            <div className="fixed justify-center items-center bottom-5 xl:right-52 lg:right-20 md:right-14 sm:right-10 right-5 cursor-pointer text-blue-800 text-6xl rounded-full">
                <i className="bi bi-plus-circle-fill" onClick={()=>setShowModal(true)}></i>
            </div>
        </div></>)
}

export default Reparaciones