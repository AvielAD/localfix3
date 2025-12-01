'use client'
import { date, number, object, string } from 'yup';
import { postFetcher, fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner } from "@avielad/componentspublish";
import { ServerResponseDto } from "@avielad/componentspublish/dist/customhooks/Dtos/ServerResponse.dto";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputFill } from '@/DTOS/reparaciones/reparacion';
import { DateTime } from "luxon";

const schemaValidation = object({
    phoneNumberClient: string()
        .max(10, 'Numero telefonico debe tener 10 digitos')
        .matches(/^[0-9]+$/, 'Solo numeros estan permitidos'),
    nameEquip: string(),
    nameClient: string(),
    lastNameClient: string(),
    dateDelivery: string().required("Fecha entrega necesaria"),
    totalCost: number().min(1, "valor minimo solicitado 1"),
    failureDescription: string().required("Informacion necesaria"),
    repairDescription: string().required("Informacion necesaria"),
    idEquip: number(),
    idGroupService: number(),
    idParentRepair: number().nullable()
})

const Add = (params: { close: Function, toast: (params: ServerResponseDto) => void, fill: InputFill }) => {
    const NowDate = DateTime.now().plus({days: 1}).toFormat("yyyy-MM-dd");

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                nameEquip: "",
                nameClient: "",
                lastNameClient: "",
                phoneNumberClient: "",
                dateDelivery: NowDate,
                totalCost: 0,
                failureDescription: "",
                repairDescription: "",
                idEquip: 0,
                idGroupService: 0,
                idParentRepair: null
            }
        })

    useEffect(() => {
        setValue("failureDescription", "" + params.fill.nameDiagnostic)
        setValue("repairDescription", "" + params.fill.repairDescription)
        setValue("totalCost", params.fill.totalCost)
    })
    
    const submitAdd = async (values: any) => {

        postFetcher('/api/reparaciones/first', {
            ...values,
            idEquip: params.fill.idEquip,
            idGroupService: params.fill.idDiagnostic,
            totalCost: params.fill.totalCost,
        }).then((data) => {
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
                                <span className="text-secondary-700 text-2xl">Dispositivo: {params.fill.nameEquip }</span>

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
                            <span className="text-secondary-700 ">Reparación / Instalación</span>
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

