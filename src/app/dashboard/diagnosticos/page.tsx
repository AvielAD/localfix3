'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import Link from "next/link"
const fetcher = (url: string) => fetch(url).then(r => r.json())


const compareFecha = (a: DiagnosticosDto, b: DiagnosticosDto) => {
    if (a.dateDiagnostic < b.dateDiagnostic)
        return 1
    if (a.dateDiagnostic > b.dateDiagnostic)
        return -1
    return 0
}
const Diagnosticos = () => {
    const router = useRouter()
    let equiposList = [] as DiagnosticosDto[]

    const diagnosticosData = useSWR('/api/diagnosticos', fetcher)

    if (!diagnosticosData.data) return <>loading...</>

    if (diagnosticosData.data) {
        equiposList = diagnosticosData.data.sort(compareFecha)
    }
    return (<>
    </>)
}

export default Diagnosticos