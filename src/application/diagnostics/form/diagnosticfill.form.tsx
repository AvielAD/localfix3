'use client'
import { number, object, string } from 'yup';
import { postFetcher, fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import useSWR from "swr";
import { BarBanner, SkeletonTable, Toast } from "@avielad/componentspublish";
import { ServerResponseDto } from "@avielad/componentspublish/dist/customhooks/Dtos/ServerResponse.dto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeviceDto } from "../../devices/dtos/devices.dto";
import { useEffect } from 'react';
import { InputFill } from '@/DTOS/reparaciones/reparacion';

const schemaValidation = object({
    failureDescription: string(),
    repairDescription: string(),
    nameEquip: string(),
    idEquip: number(),
    idGroupService: number(),
    budgetCost: number()
})

const Add = (params: { close: Function, toast: (params: ServerResponseDto) => void, fill: InputFill }) => {

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({ resolver: yupResolver(schemaValidation,), defaultValues: { budgetCost: 0 } })

    useEffect(() => {
        setValue("failureDescription", "" + params.fill.nameDiagnostic)
        setValue("repairDescription", "" + params.fill.repairDescription)
        setValue("budgetCost", params.fill.totalCost)
    })
    const submitAdd = async (values: any) => {
        postFetcher('/api/diagnosticos/', {
            ...values,
            idEquip: params.fill.idEquip,
            idGroupService: params.fill.idDiagnostic
        }).then((data) => {
            params.toast({ Message: data.message, Succedded: data.succeeded })
            if (data.succeeded) {
                params.close()
            }
        }).catch((e) => {

        })
    }

    return (<>
        <div className="">
            <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto grid ">
                <BarBanner title={{ message: `Diagnostico`, icon: "bi bi-clipboard2-pulse-fill" }}></BarBanner>
                <div className="px-4 py-1 mb-8 bg-white rounded-lg shadow-md ">
                    <label className="block text-sm">
                        <span className="text-secondary-700 text-2xl">Dispositivo: {params.fill.nameEquip}</span>
                    </label>

                    <div className='grid grid-cols-2 mt-2 gap-2'>
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

