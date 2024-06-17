'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import MenuAdd from "@/Components/AddMenu"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { Button, Fab, Icon } from "@mui/material"
import { AddCircle } from "@mui/icons-material"
import { Add } from "@mui/icons-material"
const fetcher = (url: string) => fetch(url).then(r => r.json())
const compareFecha = (a: ReparacionDto, b: ReparacionDto) => {
    if (a.recepcion > b.recepcion)
        return -1
    else if (b.recepcion < b.recepcion)
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
                        repairData?.map((item: ReparacionDto, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.modelo}</td>
                                    <td>{FormatMedDate(item.recepcion)}</td>
                                    <td>{FormatMedDate(item.entrega)}</td>
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

        </div>

        <Fab sx={{ position: "sticky", bottom: "1rem", left: "1rem" }} color="primary" aria-label="add">
            <Add />
        </Fab>
    </>)
}

export default Reparaciones