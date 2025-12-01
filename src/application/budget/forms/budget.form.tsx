'use client'
import { date, number, object, string } from 'yup';
import { fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { DevicesDto } from "@/application/devices/dtos/devices.dto";
import { useEffect, useState } from "react";
import { GroupServiceDto } from "@/application/groupservice/dto/groupservice.dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { BudgetInput } from "../dtos/budget.dto";

const schemaValidation = object({
    title: string().required("Informacion necesaria"),
    description: string().required("Informacion necesaria"),
    cost: number().min(1, "valor minimo solicitado 1"),
    idEquip: number(),
    nameEquip: string(),
    idGroupService: number(),
})

const Add = (params: {
    onSubmit: (values: BudgetInput) => void
}) => {
    const { data: DataEquipos } = useSWR<Array<DevicesDto>>('/api/equipos/popular', fetcher)
    const dataGroupService = useSWR('/api/group_service', fetcher)

    const [FilterEquipos, setFilterEquipos] = useState<Array<DevicesDto>>()
    const [queryFilter, setQueryFilter] = useState<string>("")
    const [onFocusFilter, setOnFocusFilter] = useState<boolean>(false)

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                title: "",
                cost: 0,
                description: "",
                idEquip: 0,
                nameEquip: "",
                idGroupService: 0,
            }
        })
    useEffect(() => {
        if (queryFilter !== "")
            setFilterEquipos(
                DataEquipos?.filter(x =>
                    x.company?.toLocaleLowerCase().includes(queryFilter.toLocaleLowerCase()) ||
                    x.brand?.toLocaleLowerCase().includes(queryFilter.toLocaleLowerCase()) ||
                    x.technicalModel?.toLocaleLowerCase().includes(queryFilter.toLocaleLowerCase()) ||
                    x.popularModel?.toLocaleLowerCase().includes(queryFilter.toLocaleLowerCase())
                ))
        if (DataEquipos && queryFilter === "")
            setFilterEquipos(DataEquipos?.slice(0, 10))
    }, [queryFilter, DataEquipos])

    const SelectDeviceFilter = (idEquip: number, nameEquip: string) => {
        setValue("idEquip", idEquip)
        setValue("nameEquip", nameEquip)
    }
    const submitAdd = async (values: any) => {
        params.onSubmit({ ...values });
    }

    return (<>
        <div className="">
            {
                <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto " >
                    <div className="rounded-lg ">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">

                            <label className="block text-sm">
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
                                            FilterEquipos?.map((item: DevicesDto, index: number) => (
                                                <li key={index} value={item.id}
                                                    className='hover:bg-primary-500 rounded-md py-2 px-1'
                                                    onMouseDown={() => SelectDeviceFilter(item.id, item.brand + " " + item.popularModel)}>{item.company} {item.brand} {item.popularModel}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                {errors.idEquip ? <span className="text-danger-700"> {errors.idEquip.message}</span> : null}

                            </label>

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
                                <span className="text-secondary-700 ">Titulo</span>
                                <input
                                    {...register("title")}
                                    className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                ></input>
                            </label>

                            <label className="block text-sm">
                                <span className="text-secondary-700">Costo Total</span>
                                <input
                                    {...register("cost")}
                                    className={`bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                                ></input>
                                {errors.cost ? <span className="text-danger-700"> {errors.cost.message}</span> : null}
                            </label>

                            <label className="block text-sm">
                                <span className="text-secondary-700 ">Descripcion</span>
                                <textarea
                                    //name="name"
                                    {...register("description")}
                                    rows={6}
                                    className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                ></textarea>
                                {errors.description ? <span className="text-danger-700"> {errors.description.message}</span> : null}

                            </label>
                        </div>
                        <div className="flex items-center justify-between sm:justify-between mt-2">
                            <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Agregar</button>
                        </div>
                    </div>
                </form>

            }
        </div>
    </>)

}
export default Add

