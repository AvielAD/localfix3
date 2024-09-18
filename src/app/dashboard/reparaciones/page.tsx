'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"


const fetcher = (url: string) => fetch(url).then(r => r.json())
const compareFecha = (a: ReparacionDto, b: ReparacionDto) => {
    if (a.dateReception > b.dateReception)
        return -1
    else if (b.dateReception < b.dateReception)
        return 1
    else
        return 0
}
const Reparaciones = () => {

    let repairData = [] as Array<ReparacionDto>
    const router = useRouter()
    const diagnosticosData = useSWR('/api/reparaciones', fetcher)

    if (!diagnosticosData.data) return <>loading...</>
    if (diagnosticosData.data) {
        repairData = diagnosticosData.data.sort(compareFecha)
    }

    
    return (<>
        <div  >
            <div >
            </div>
        </div>



    </>)
}

export default Reparaciones