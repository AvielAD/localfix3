'use client'
import MenuAdd from "@/Components/AddMenu"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos"
import { DevicesDto } from "@/DTOS/equipos/devices"
const fetcher = (url: string) => fetch(url).then(r => r.json())


const compareFecha = (a: DiagnosticosDto, b: DiagnosticosDto)=>{
    if(a.fecha < b.fecha)
        return 1
    if(a.fecha > b.fecha)
        return -1
    return 0
}
const Diagnosticos = () => {
    const router = useRouter()
    let equiposList = [] as DiagnosticosDto[]

    const diagnosticosData = useSWR('/api/diagnosticos', fetcher)

    if (!diagnosticosData.data) return <>loading...</>

    if(diagnosticosData.data){
        equiposList = diagnosticosData.data.sort(compareFecha)
    }
    return (<>
        <h1 className="text-center">Diagnosticos esta semana</h1>
        <div className="d-flex justify-content-center">
            <MenuAdd url='/dashboard/diagnosticos/Add'></MenuAdd>
        </div>

        <div>
            <table className="table overflow-x-scroll">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">Equipo</th>
                        <th className="text-center" scope="col">Fecha</th>
                        <th className="text-center" scope="col">$</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equiposList?.map((item: DiagnosticosDto, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.nombre} {item.modelopopular}</td>
                                    <td>{item.fecha.toLocaleString().split("T")[0]}</td>
                                    <td className="text-end">{item.costopresupuesto}</td>
                                    <td>
                                        <i onClick={
                                            () => router.push(`/dashboard/reparaciones/${item.id}`)

                                        } className='m-2 bi bi-plus-circle-dotted'></i>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>

            </table>

        </div>    </>)
}

export default Diagnosticos