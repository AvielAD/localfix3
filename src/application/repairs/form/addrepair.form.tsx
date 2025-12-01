'use client'
import { ReparacionFirstDto, ReparacionFirstInputDto } from "@/DTOS/reparaciones/reparacion";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps, FormikHelpers, FormikState } from "formik";
import { date, number, object, string } from 'yup';
import { postFetcher, fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import useSWR from "swr";
import { DateTime } from "luxon";
import { BarBanner } from "@avielad/componentspublish";
import { ServerResponseDto } from "@avielad/componentspublish/dist/customhooks/Dtos/ServerResponse.dto";
import { useForm } from "react-hook-form";
import { DevicesDto } from "@/application/devices/dtos/devices.dto";
import { useEffect, useState } from "react";
import { GroupServiceDto } from "@/application/groupservice/dto/groupservice.dto";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaValidation = object({
    phoneNumberClient: string()
        .max(10, 'Numero telefonico debe tener 10 digitos')
        .matches(/^[0-9]+$/, 'Solo numeros estan permitidos'),
    nameEquip: string(),
    nameClient: string(),
    lastNameClient: string(),
    dateDelivery: string().required("Fecha entrega necesaria"),
    totalCost: number().min(1,"valor minimo solicitado 1"),
    failureDescription: string().required("Informacion necesaria"),
    repairDescription: string().required("Informacion necesaria"),
    idEquip: number(),
    idGroupService: number(),
    idParentRepair: number().nullable()
})

const Add = (params: { close: Function, toast: (params: ServerResponseDto) => void }) => {
    const { data: DataEquipos } = useSWR<Array<DevicesDto>>('/api/equipos/popular', fetcher)
    const dataGroupService = useSWR('/api/group_service', fetcher)

    const [FilterEquipos, setFilterEquipos] = useState<Array<DevicesDto>>()
    const [queryFilter, setQueryFilter] = useState<string>("")
    const [onFocusFilter, setOnFocusFilter] = useState<boolean>(false)

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                nameEquip: "",
                nameClient: "",
                lastNameClient: "",
                phoneNumberClient: "",
                dateDelivery: "",
                totalCost: 0,
                failureDescription: "",
                repairDescription: "",
                idEquip: 0,
                idGroupService: 0,
                idParentRepair: null
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
        
        postFetcher('/api/reparaciones/first', values).then((data) => {
            params.toast({ Message: data.message, Succedded: data.succedded })
            if (data.succedded) {
                params.close()
            }
        }).catch((e) => {

        })
    }

    return (<>
        <div className="">
        {
            <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto " >
                <BarBanner title={{ message: `Reparacion`, icon: "bi bi-wrench-adjustable" }}></BarBanner>
                <div className="rounded-lg ">
                    <div className="grid grid-cols-2 gap-2">

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
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                        <label className="">
                            <span className="text-secondary-700 ">Nombre</span>
                            <input
                                {...register("nameClient")}
                                className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            ></input>
                        </label>

                        <label className="">
                            <span className="text-secondary-700 ">Apellido</span>
                            <input
                                {...register("lastNameClient")}
                                className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            ></input>
                        </label>

                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <label className="">
                            <span className="text-secondary-700">Telefono</span>
                            <input
                                {...register("phoneNumberClient")}
                                className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            ></input>
                            {errors.phoneNumberClient ? <span className="text-danger-700"> {errors.phoneNumberClient.message}</span> : null}

                        </label>

                        <label className="">
                            <span className="text-secondary-700">Fecha Entrega</span>
                            <input
                                className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                type="date"
                                {...register("dateDelivery")}
                            ></input>
                            {errors.dateDelivery ? <span className="text-danger-700"> {errors.dateDelivery.message}</span> : null}

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
                        {errors.failureDescription ? <span className="text-danger-700"> {errors.failureDescription.message}</span> : null}

                    </label>

                    <label className="block text-sm">
                        <span className="text-secondary-700 ">Descripcion Falla</span>
                        <textarea
                            //name="name"
                            {...register("repairDescription")}
                            rows={6}
                            className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        ></textarea>
                        {errors.repairDescription ? <span className="text-danger-700"> {errors.repairDescription.message}</span> : null}

                    </label>

                    <label className="block text-sm">
                        <span className="text-secondary-700">Costo Total</span>
                        <input
                            {...register("totalCost")}
                            className={`shadow-sm appearance-none border rounded-sm w-full py-2 px-3 text-secondary-700 leading-tight focus:outline-hidden focus:shadow-outline`}
                        ></input>
                        {errors.totalCost ? <span className="text-danger-700"> {errors.totalCost.message}</span> : null}
                    </label>
                    <div className="flex items-center justify-between sm:justify-between mt-2">
                        <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Agregar</button>
                        <button type="button" className="bg-danger-500 hover:bg-danger-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline" onClick={() => params.close()}>Cancelar</button>
                    </div>
                </div>
            </form>
            
        }
        </div>
    </>)

}
export default Add

