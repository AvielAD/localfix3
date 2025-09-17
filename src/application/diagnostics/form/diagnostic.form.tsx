'use client'
import { number, object, string } from 'yup';
import { postFetcher, fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import useSWR from "swr";
import { BarBanner, SkeletonTable } from "@avielad/componentspublish";
import { ServerResponseDto } from "@avielad/componentspublish/dist/customhooks/Dtos/ServerResponse.dto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeviceDto } from "../../devices/dtos/devices.dto";
import { GroupServiceDto } from '../../groupservice/dto/groupservice.dto';
import { useEffect, useState } from 'react';

const schemaValidation = object({
    failureDescription: string(),
    repairDescription: string(),
    nameEquip: string(),
    idEquip: number(),
    idGroupService: number(),
    budgetCost: number()
})

const Add = (params: { close: Function, toast: (params: ServerResponseDto) => void }) => {
    const { data: DataEquipos } = useSWR<Array<DeviceDto>>('/api/equipos/popular', fetcher)
    const [FilterEquipos, setFilterEquipos] = useState<Array<DeviceDto>>()
    const dataGroupService = useSWR('/api/group_service', fetcher)
    const [queryFilter, setQueryFilter] = useState<string>("")
    const [onFocusFilter, setOnFocusFilter] = useState<boolean>(false)

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({ resolver: yupResolver(schemaValidation,), defaultValues: { budgetCost: 0 } })

    useEffect(() => {
        if (queryFilter !== "")
            setFilterEquipos(
                DataEquipos?.filter(x =>
                    x.company?.toLocaleLowerCase().includes(queryFilter.toLocaleLowerCase()) ||
                    x.brand?.toLocaleLowerCase().includes(queryFilter.toLocaleLowerCase()) ||
                    x.model?.toLocaleLowerCase().includes(queryFilter.toLocaleLowerCase())
                ))
        if (DataEquipos && queryFilter === "")
            setFilterEquipos(DataEquipos?.slice(0, 10))
    }, [queryFilter, DataEquipos])

    const SelectDeviceFilter = (idEquip: number, nameEquip: string) => {
        setValue("idEquip", idEquip)
        setValue("nameEquip", nameEquip)
    }
    const submitAdd = async (values: any) => {
        postFetcher('/api/diagnosticos/', { ...values }).then((data) => {
            params.toast({ Message: data.message, Succedded: data.succedded })
            if (data.succedded) {
                params.close()
            }
        }).catch((e) => {

        })
    }
    if (!DataEquipos) return <SkeletonTable></SkeletonTable>

    return (<>
        <div className="">
            <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto grid ">
                <BarBanner title={{ message: `Diagnostico`, icon: "bi bi-clipboard2-pulse-fill" }}></BarBanner>
                <div className="px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">
                    <label className="block text-sm mt-2">
                        <span className="text-secondary-700">Seleccionar Dispositivo</span>
                        <input
                            className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            type='text'
                            autoComplete='off'
                            {...register("nameEquip")}
                            onChange={(e) => setQueryFilter(e.target.value)}
                            onFocus={() => setOnFocusFilter(true)}
                            onBlur={() => setOnFocusFilter(false)}
                        ></input>

                        <div className={`${onFocusFilter ? "" : "hidden"} absolute`}>
                            <ul
                                className="relative bg-white border border-secondary-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                            >
                                {
                                    FilterEquipos?.map((item: DeviceDto, index: number) => (
                                        <li key={index} value={item.id}
                                            className='hover:bg-primary-500 rounded-md py-2 px-1'
                                            onMouseDown={() => SelectDeviceFilter(item.id, item.brand + " " + item.model)}>{item.company} {item.brand} {item.model}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        {errors.idEquip ? <span className="text-danger-700"> {errors.idEquip.message}</span> : null}

                    </label>
                    <div className='grid grid-cols-2 mt-2 gap-2'>
                        <label className="block text-sm ">
                            <span className="text-secondary-700">Tipo Diagnostico</span>
                            <select {...register("idGroupService")}
                                className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                            >
                                <option value="">Seleccionar...</option>
                                {
                                    dataGroupService.data?.map((item: GroupServiceDto, index: number) => (
                                        <option key={index} value={item.id} className=''>{item.name}</option>
                                    ))
                                }
                            </select>
                            {errors.idEquip ? <span className="text-danger-700"> {errors.idEquip.message}</span> : null}

                        </label>

                        <label className="block text-sm">
                            <span className="text-secondary-700 ">Costo Presupuesto</span>
                            <input
                                //name="name"
                                {...register("budgetCost")}
                                className=" border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            ></input>
                            {errors.budgetCost ? <span className="text-danger-700"> {errors.budgetCost.message}</span> : null}

                        </label>

                    </div>
                    <label className="block text-sm">
                        <span className="text-secondary-700 ">Descripcion Falla</span>
                        <textarea
                            //name="name"
                            {...register("failureDescription")}
                            rows={6}
                            className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        ></textarea>

                    </label>

                    <label className="block text-sm">
                        <span className="text-secondary-700 ">Descripcion Falla</span>
                        <textarea
                            //name="name"
                            {...register("repairDescription")}
                            rows={6}
                            className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        ></textarea>

                    </label>

                </div>

                <div className="flex items-center justify-between sm:justify-between ">
                    <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Agregar</button>
                    <button type="button" className="bg-danger-500 hover:bg-danger-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline" onClick={() => params.close()}>Cancelar</button>
                </div>
            </form>
        </div>
    </>)
}

export default Add

