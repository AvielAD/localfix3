'use client'
import useSWR from "swr"
import { fetcher, postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner, ElementList, FormSearhFilters, SkeletonTable } from "@avielad/componentspublish"
import { useContext, useEffect, useState } from "react"
import { RefreshContext } from "../layout"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import { useRouter } from "next/navigation"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { RepairByFilters, RepairInput, RepairResumeDto } from "@/application/repairs/dto/repair.dto"
import FormFilters from '@/application/repairs/form/filters.form'
const StatusInfo = {
    "ACCEPT": "bg-notification1-200 text-notificacion1-800",
    "START": "bg-notification1-200 text-notificacion1-800",
    "DONE": "bg-notification2-200 text-notification2-800",
    "PAUSE": "bg-notification3-200 text-notification3-800",
    "CANCEL": "bg-notification4-200 text-notification4-800",
    "DELIVERED": "bg-notification5-200 text-notification5-800"
}
const Reparaciones = () => {
    const [showFilters, setShowFilters] = useState(false)
    const [dataValuesFilter, setDataValuesFilter] = useState<RepairByFilters>({
        states: [1, 2, 5]
    } as RepairByFilters)
    const [dataRepair, setDataRepair] = useState<Array<RepairResumeDto>>()
    const useRefreshContext = useContext(RefreshContext)
    const router = useRouter()
    const [tabView, setTabView] = useState(false)

    useEffect(() => {
        postFetcher('/api/reparaciones/filters', dataValuesFilter)
            .then((data) => {
                setDataRepair(data)
            })
    }, [dataValuesFilter])

    if (!dataRepair) return <SkeletonTable></SkeletonTable>

    const OnSubmitFilters = (values: RepairByFilters) => {
        console.log(values)
        setDataValuesFilter(values)
    }
    const SetClientName = (name: string) => {
        setDataValuesFilter({ ...dataValuesFilter, name })
    }
    return (
        <div className="mx-auto">

            <div className="border-b border-default">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-body">
                    <li className="me-2">
                        <a
                            onClick={() => setTabView(!tabView)}
                            className="inline-flex items-center justify-center p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand group cursor-pointer">
                            <i className="bi bi-diagram-3 me-2"></i>
                            Tablero
                        </a>
                    </li>
                    <li className="me-2">
                        <a
                            onClick={() => setTabView(!tabView)}
                            className="inline-flex items-center justify-center p-4 text-fg-brand border-b border-brand rounded-t-base active group cursor-pointer" aria-current="page">
                            <i className="bi bi-clock me-2"></i>
                            Historico
                        </a>
                    </li>

                </ul>
            </div>
            <div className={`${tabView ? 'hidden' : ''}`}>
                <div className='mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                    <div className=''>
                        <div className='mb-2'>
                            <span className='h-[50px] p-2 flex justify-center rounded-lg border border-theme1-500 bg-theme1-300'>Aceptadas</span>
                        </div>
                        <div className='grid gap-2'>
                            {
                                dataRepair ? dataRepair.map((item: RepairResumeDto, index: number) => {
                                    if (item.state.nombre === "ACCEPT")
                                        return (<ElementList
                                            title={`${item.brand} ${item.model}`}
                                            state={{ info: item.state.nombre, message: item.state.nombre }}
                                            bannermessage={``}
                                            buttons={[{ icon: "bi bi-eye", action: () => { router.push(`/dashboard/reparaciones/details/${item.uuid}`) }, title: "Ver Detalles", disabled: false }]}
                                            messages={[
                                                { title: "Fecha Recepcion", message: ` ${FormatMedDate(item.dateReception)}` },
                                                { title: "Fecha Entrega", message: ` ${FormatMedDate(item.dateDelivery)}` }
                                            ]}
                                            statusInfo={StatusInfo} key={index} ></ElementList>)
                                }) : <></>
                            }
                        </div>


                    </div>
                    <div className=''>
                        <div className='mb-2'>
                            <span className='h-[50px] p-2 flex justify-center rounded-lg border border-danger-500 bg-danger-300'>En Proceso</span>
                        </div>
                        <div className=''>
                            {
                                dataRepair ? dataRepair.map((item: RepairResumeDto, index: number) => {
                                    if (item.state.nombre === "START")
                                        return (<ElementList
                                            title={`${item.brand} ${item.model}`}
                                            state={{ info: item.state.nombre, message: item.state.nombre }}
                                            bannermessage={``}
                                            buttons={[{ icon: "bi bi-eye", action: () => { router.push(`/dashboard/reparaciones/details/${item.uuid}`) }, title: "Ver Detalles", disabled: false }]}
                                            messages={[
                                                { title: "Fecha Recepcion", message: ` ${FormatMedDate(item.dateReception)}` },
                                                { title: "Fecha Entrega", message: ` ${FormatMedDate(item.dateDelivery)}` }
                                            ]}
                                            statusInfo={StatusInfo} key={index} ></ElementList>)
                                }) : <></>
                            }
                        </div>


                    </div>
                    <div className=''>
                        <div className='mb-2'>
                            <span className='h-[50px] p-2 flex justify-center rounded-lg border border-success-500 bg-success-300'>Completadas</span>
                        </div>
                        <div className=''>
                            {
                                dataRepair ? dataRepair.map((item: RepairResumeDto, index: number) => {
                                    if (item.state.nombre === "DONE")
                                        return (<ElementList
                                            title={`${item.brand} ${item.model}`}
                                            state={{ info: item.state.nombre, message: item.state.nombre }}
                                            bannermessage={``}
                                            buttons={[{ icon: "bi bi-eye", action: () => { router.push(`/dashboard/reparaciones/details/${item.uuid}`) }, title: "Ver Detalles", disabled: false }]}
                                            messages={[
                                                { title: "Fecha Recepcion", message: ` ${FormatMedDate(item.dateReception)}` },
                                                { title: "Fecha Entrega", message: ` ${FormatMedDate(item.dateDelivery)}` }
                                            ]}
                                            statusInfo={StatusInfo} key={index} ></ElementList>)
                                }) : <></>
                            }
                        </div>


                    </div>
                </div>
            </div>
            <div className={`${tabView ? '' : 'hidden'}`}>
                <BarBanner title={{ message: "Reparaciones", icon: "bi bi-cart4" }} >
                    <FormSearhFilters
                        showFilters={{ show: showFilters, setShow: () => setShowFilters(!showFilters) }}
                        datainput={{ setValue: SetClientName }}>
                        <FormFilters OnSubmit={OnSubmitFilters}></FormFilters>
                    </FormSearhFilters>
                </BarBanner>
                {
                    dataRepair ? dataRepair?.map((item: ReparacionDto, index: number) =>
                    (<ElementList
                        title={`${item.brand} ${item.model}`}
                        state={{ info: item.state.nombre, message: item.state.nombre }}
                        bannermessage={``}
                        buttons={[{ icon: "bi bi-eye", action: () => { router.push(`/dashboard/reparaciones/details/${item.uuid}`) }, title: "Ver Detalles", disabled: false }]}
                        messages={[
                            { title: "Fecha Recepcion", message: ` ${FormatMedDate(item.dateReception)}` },
                            { title: "Fecha Entrega", message: ` ${FormatMedDate(item.dateDelivery)}` }
                        ]}
                        statusInfo={StatusInfo}
                        key={index} ></ElementList>)) : <></>
                }
            </div>

        </div>
    )
}

export default Reparaciones