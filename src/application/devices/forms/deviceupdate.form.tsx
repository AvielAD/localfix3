'use client'
import { DevicesAssignInputDto, DevicesDto } from "@/DTOS/equipos/devices";
import { BarBanner } from "@avielad/componentspublish";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";

const schemaValidation = object({
    id: number(),
    popularModel: string(),
    technicalModel: string(),
    description: string(),
})

const Add = (params: { values: DevicesDto | null, setValues: (params: DevicesAssignInputDto) => void }) => {
    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                popularModel: "",
                technicalModel: "",
            }
        })

    useEffect(() => {
        setValue("popularModel", "" + params.values?.popularModel)
        setValue("technicalModel", "" + (params.values?.technicalModel ?? ""))
    })
    const submitAdd = async (values: any) => {

    }
    return (
        <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto ">
            <BarBanner title={{ message: `Dispositivo`, icon: "bi bi-wrench-adjustable" }}></BarBanner>
            <div className="grid grid-cols-1 px-4 py-1 mb-8 bg-white rounded-lg shadow-md">

                <label className="block text-sm">
                    <span className="text-secondary-700 dark:text-secondary-400">Modelo Tecnico</span>
                    <input
                        {...register("technicalModel")}
                        className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    ></input>
                    {errors.technicalModel ? <span className="text-danger-700"> {errors.technicalModel.message}</span> : null}
                </label>

                <label className="block text-sm">
                    <span className="text-secondary-700 dark:text-secondary-400">Modelo Popular</span>
                    <input
                        {...register("popularModel")}
                        className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    ></input>
                    {errors.popularModel ? <span className="text-danger-700"> {errors.popularModel.message}</span> : null}
                </label>
                <div className="flex items-center justify-end sm:justify-end mt-4">
                    <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Agregar</button>
                </div>
            </div>
        </form>)
}

export default Add
