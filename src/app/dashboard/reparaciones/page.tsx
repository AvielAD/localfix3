'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import MenuAdd from "@/Components/AddMenu"

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Reparaciones = () => {
    const router = useRouter()
    const diagnosticosData = useSWR('/api/reparaciones', fetcher)
    if (!diagnosticosData.data) return <>loading...</>

    return (<>
        <h1 className="text-center">Reparaciones</h1>
        <div className="d-flex justify-content-center">
            <MenuAdd url='/dashboard/reparaciones/first'></MenuAdd>
        </div>

        <div>
            <table className="table overflow-x-scroll">
                <thead>
                    <tr>
                        <th scope="col">Equipo</th>
                        <th scope="col">Recepcion</th>
                        <th scope="col">Entrega</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diagnosticosData.data.map((item: ReparacionDto, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.modelo}</td>
                                    <td>{item.recepcion.toString().split("T")[0]}</td>
                                    <td>{item.entrega.toString().split("T")[0]}</td>
                                    <td>
                                    <i onClick={
                                            () => router.push(`/dashboard/reparaciones/details/${item.uuid}`)

                                        } className='m-2 bi bi-eye'></i>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>

            </table>

        </div>    </>)
}

export default Reparaciones