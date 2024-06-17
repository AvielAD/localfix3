'use client'
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { Fab, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "@/Utilities/TableHelpers/StyledTable"
import Link from "next/link"
import { Add } from "@mui/icons-material"
const fetcher = (url: string) => fetch(url).then(r => r.json())


const compareFecha = (a: DiagnosticosDto, b: DiagnosticosDto) => {
    if (a.fecha < b.fecha)
        return 1
    if (a.fecha > b.fecha)
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

        <Grid container rowSpacing={2} >
            <Grid item xs={12}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: '48rem' }} >
                        <Table stickyHeader>
                            <TableHead sx={{ color: 'white' }}>
                                <TableRow>
                                    <StyledTableCell>Equipo</StyledTableCell>
                                    <StyledTableCell>Fecha</StyledTableCell>
                                    <StyledTableCell>Acciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    equiposList?.map((item: DiagnosticosDto, index: number) => {
                                        return (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell>{item.nombre} {item.modelopopular}</StyledTableCell>
                                                <StyledTableCell>{FormatMedDate(item.fecha)}</StyledTableCell>
                                                <StyledTableCell>
                                                    <i onClick={
                                                        () => router.push(`/dashboard/reparaciones/${item.id}`)
                                                    } className='m-2 bi bi-plus-circle-dotted'></i>
                                                </StyledTableCell>
                                            </StyledTableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item sx={{ position: "sticky", bottom: 16, left: 16 }}>
                <Fab color="primary" aria-label="add">
                    <Link href='/dashboard/diagnosticos/Add'>
                        <Add sx={{ color: "white" }} />
                    </Link>
                </Fab>
            </Grid>

        </Grid>

    </>)
}

export default Diagnosticos