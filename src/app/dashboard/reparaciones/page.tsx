'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"

import { Fab, Grid } from "@mui/material"
import { Add } from "@mui/icons-material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link"
import { StyledTableCell, StyledTableRow } from "@/Utilities/TableHelpers/StyledTable"
import { addDatadto } from "@/DTOS/modal/form.dto"
import { useState } from "react"
import { response } from "@/DTOS/response/response"


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

    const [dataForm, setDataForm] = useState({
        showModal: false,
        triggerToast: false,
        serverresponse: {} as response
    } as addDatadto)
    

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
                        <Table stickyHeader>
                            <TableHead sx={{color: 'white'}}>
                                <TableRow>
                                    <StyledTableCell>Equipo</StyledTableCell>
                                    <StyledTableCell>Recepcion</StyledTableCell>
                                    <StyledTableCell>Entrega</StyledTableCell>
                                    <StyledTableCell>Acciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    repairData?.map((item: ReparacionDto, index: number) => {
                                        return (
                                            <StyledTableRow key={index}>
                                                <TableCell>{item.model}</TableCell>
                                                <TableCell>{FormatMedDate(item.dateReception)}</TableCell>
                                                <TableCell>{FormatMedDate(item.dateDelivery)}</TableCell>
                                                <TableCell>
                                                    <i onClick={
                                                        () => router.push(`/dashboard/reparaciones/details/${item.uuid}`)

                                                    } className='m-2 bi bi-eye'></i>
                                                </TableCell>
                                            </StyledTableRow>)
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