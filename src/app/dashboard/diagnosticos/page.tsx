'use client'
import useSWR from "swr"
import TableDiag from '@/Components/new/components/tablas/table_diag'
import BanerNew from '@/Components/new/components/barbanner'

const fetcher = (url: string) => fetch(url).then(r => r.json())


const Diagnosticos = () => {
    const diagnosticosData = useSWR('/api/diagnosticos', fetcher)
    if (!diagnosticosData.data) return <>loading...</>

    return (<>
            <div className="max-w-screen-lg mx-auto text-black">
            <BanerNew title="Diagnosticos" starmessage="Filtrado" arrowmessage="Iniciadas Terminadas"></BanerNew>
            <TableDiag elements={diagnosticosData.data} ></TableDiag>
        </div>
    </>)
}

export default Diagnosticos