'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import MenuAdd from "@/Components/AddMenu"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"

import { Button, Fab, Grid, Icon } from "@mui/material"
import { AddCircle } from "@mui/icons-material"
import { Add } from "@mui/icons-material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link"


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
        <Grid container rowSpacing={2} >
            <Grid item xs={12}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: '48rem' }} >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Equipo</TableCell>
                                    <TableCell>Recepcion</TableCell>
                                    <TableCell>Entrega</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    repairData?.map((item: ReparacionDto, index: number) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{item.modelo}</TableCell>
                                                <TableCell>{FormatMedDate(item.recepcion)}</TableCell>
                                                <TableCell>{FormatMedDate(item.entrega)}</TableCell>
                                                <TableCell>
                                                    <i onClick={
                                                        () => router.push(`/dashboard/reparaciones/details/${item.uuid}`)

                                                    } className='m-2 bi bi-eye'></i>
                                                </TableCell>
                                            </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item sx={{position: "sticky",  bottom: 16, left: 16}}>
                <Fab color="primary" aria-label="add">
                    <Link href='/dashboard/reparaciones/first'>
                        <Add sx={{ color: "white" }} />
                    </Link>
                </Fab>
            </Grid>

        </Grid>



    </>)
}

export default Reparaciones