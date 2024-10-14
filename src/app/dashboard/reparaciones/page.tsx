'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { fetcher } from '@/Utilities/FetchHelper/Fetch.helper'


import TableRepair from '@/Components/new/components/tablas/table'
import BanerNew from '@/Components/new/components/barbanner'
const Reparaciones = () => {
    const router = useRouter()

    const infoRepairs = useSWR('/api/reparaciones', fetcher)


    if (!infoRepairs.data) return <>loading...</>

    return (
        <div className="max-w-screen-lg mx-auto">
            <BanerNew title="Reparaciones" starmessage="Filtrado" arrowmessage="Iniciadas Terminadas"></BanerNew>
            <TableRepair elements={infoRepairs.data} urldetails="/dashboard/reparaciones/details/"></TableRepair>
        </div>
    )
}

export default Reparaciones
///dashboard/reparaciones/details/