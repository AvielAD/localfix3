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

    if (!diagnosticosData.data) return <>loading...</>


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
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diagnosticosData.data.map((item: DiagnosticosDto, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.nombre} {item.modelopopular}</td>
                                    <td>{item.fecha.toLocaleString().split("T")[0]}</td>
                                    <td>{item.descripcionfalla.split(" ")[0]}</td>
                                    <td>{item.costopresupuesto}</td>
                                    <td>
                                        <i onClick={
                                            () => router.push(`/dashboard/reparaciones/${item.id}`)

                                        } className='m-2 bi bi-tools'></i>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>

            </table>
            <MenuAdd url='/dashboard/diagnosticos/Add'></MenuAdd>

        </div>    </>)
}

export default Diagnosticos