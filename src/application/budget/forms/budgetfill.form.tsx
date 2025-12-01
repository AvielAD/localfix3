'use client'
import { number, object, string } from 'yup';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { BudgetInputFill, BudgetUpdateDto } from "../dtos/budget.dto";
import { BarBanner } from '@avielad/componentspublish';

const schemaValidation = object({
    idBudget: number(),
    title: string(),
    cost: number().min(1, "valor minimo solicitado 1"),
    description: string()
})

const Add = (params: {
    fill: BudgetInputFill | null,
    onSubmit: (values: BudgetUpdateDto) => void
}) => {

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                idBudget: 0,
                title: "",
                cost: 0,
                description: ""
            }
        })
    useEffect(() => {
        setValue("idBudget", params.fill?.idBudget)
        setValue("title", params.fill?.title || "")
        setValue("cost", params.fill?.cost || 0)
        setValue("description", params.fill?.description || "")
    })
    const submitAdd = async (values: any) => {
        params.onSubmit({ ...values });
    }

    return (<>
        <div className="">
                <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto " >
            <BarBanner title={{ message: `Dispositivo`, icon: "bi bi-wrench-adjustable" }}></BarBanner>

                    <div className="rounded-lg ">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">

                            <label className="blocktext-xl font-bold">
                                <span>{params.fill?.nameEquipo}</span>
                                <span>{params.fill?.nameGroupService}</span>
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
                            <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Actualizar</button>
                        </div>
                    </div>
                </form>
        </div>
    </>)

}
export default Add

