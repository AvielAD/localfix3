'use client'
import MenuAdd from "@/Components/AddMenu"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos"
import { DevicesDto } from "@/DTOS/equipos/devices"
const fetcher = (url: string) => fetch(url).then(r => r.json())

const Diagnosticos = () => {
    const router = useRouter()
    let equiposList: DevicesDto[] = [] 

    const diagnosticosData = useSWR('/api/diagnosticos', fetcher)
    const equiposData = useSWR('/api/equipos', fetcher)

    if (!diagnosticosData.data && !equiposData.data) return <>loading...</>
    
    if(diagnosticosData.data && equiposData.data)
        equiposList = equiposData.data


    return (<>
        <h1 className="text-center">Diagnosticos esta semana</h1>
        <div>
            <table className="table overflow-x-scroll">
                <thead>
                    <tr>
                        <th scope="col">Equipo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Falla</th>
                        <th scope="col">Presupuesto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diagnosticosData.data.map((item: DiagnosticosDto, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{equiposList.find(x => x.id == item.idequipo)?.model}</td>
                                    <td>{item.fecha.toLocaleString().split("T")[0]}</td>
                                    <td>{item.descripcionfalla.split(" ")[0]}</td>
                                    <td>{item.costopresupuesto}</td>
                                </tr>)
                        })
                    }
                </tbody>

            </table>
            <MenuAdd url='/dashboard/diagnosticos/Add'></MenuAdd>

        </div>    </>)
}

export default Diagnosticos