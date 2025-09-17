'use client'
import useSWR from "swr"
import TableDiag from '@/components/tablas/table_diag'
import { BarBanner } from "@avielad/componentspublish"
const fetcher = (url: string) => fetch(url).then(r => r.json())


const Diagnosticos = () => {
    const diagnosticosData = useSWR('/api/diagnosticos', fetcher)
    if (!diagnosticosData.data) return <>loading...</>

    return (<>
            <div className="max-w-(--breakpoint-lg) mx-auto text-black">
            <BarBanner title={{ message: "Diagnosticos", icon: "bi bi-calculator-fill" }}></BarBanner>
            <TableDiag elements={diagnosticosData.data} ></TableDiag>
        </div>
    </>)
}

export default Diagnosticos