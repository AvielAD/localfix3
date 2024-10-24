'use client'
import useSWR from "swr"
import TableDiag from '@/components/tablas/table_diag'
import { BarBanner } from "@avielad/componentspublish"
const fetcher = (url: string) => fetch(url).then(r => r.json())


const Diagnosticos = () => {
    const diagnosticosData = useSWR('/api/diagnosticos', fetcher)
    if (!diagnosticosData.data) return <>loading...</>

    return (<>
            <div className="max-w-screen-lg mx-auto text-black">
            <BarBanner title="Diagnosticos" starmessage="Filtrado" arrowmessage="Iniciadas Terminadas"></BarBanner>
            <TableDiag elements={diagnosticosData.data} ></TableDiag>
        </div>
    </>)
}

export default Diagnosticos