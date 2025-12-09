'use client'
import { number, object, string } from 'yup';
import { postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner } from "@avielad/componentspublish";
import { ServerResponseDto } from "@avielad/componentspublish/dist/customhooks/Dtos/ServerResponse.dto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaValidation = object({
    nombre: string().required("Informacion necesaria"),
    descripcion: string().required("Informacion necesaria"),
    costBuy: number().min(1, "valor minimo solicitado 1"),
    costSale: number().min(1, "valor minimo solicitado 1"),

})

const Add = (params: { idRepair: number, close: Function, toast: (params: ServerResponseDto) => void }) => {


    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                nombre: "",
                descripcion: "",
                costBuy: 0,
                costSale: 0,
            }
        })

    const submitAdd = async (values: any) => {

        postFetcher(`/api/reparaciones/${params.idRepair}/refaction`, values).then((data) => {
            params.toast({ Message: data.message, Succedded: data.succeeded })
            if (data.succeeded) {
                params.close()
            }
        }).catch((e) => {

        })
    }

    return (<>
        <div className="">
            
                <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto " >
                    <BarBanner title={{ message: `Refaccion `, icon: "bi bi-wrench-adjustable" }}></BarBanner>
                    <div className="rounded-lg ">

                        <div className="grid grid-cols-1 gap-1">
                            <label className="">
                                <span className="text-secondary-700 ">Nombre</span>
                                <input
                                autoComplete='off'
                                    {...register("nombre")}
                                    className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                ></input>
                            </label>



                            <label className="block text-sm">
                                <span className="text-secondary-700 ">Descripcion</span>
                                <textarea
                                    //name="name"
                                    {...register("descripcion")}
                                    rows={2}
                                    className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                ></textarea>
                                {errors.descripcion ? <span className="text-danger-700"> {errors.descripcion.message}</span> : null}
                            </label>


                            <label className="block text-sm">
                                <span className="text-secondary-700">Costo Compra</span>
                                <input
                                    {...register("costBuy")}
                                    className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                ></input>
                                {errors.costBuy ? <span className="text-danger-700"> {errors.costBuy.message}</span> : null}
                            </label>
                            <label className="block text-sm">
                                <span className="text-secondary-700">Costo Venta</span>
                                <input
                                    {...register("costSale")}
                                        className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    ></input>
                                {errors.costSale ? <span className="text-danger-700"> {errors.costSale.message}</span> : null}
                            </label>
                            <div className="flex items-center justify-between sm:justify-between mt-2">
                                <button type="button" className="bg-danger-500 hover:bg-danger-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline" onClick={() => params.close()}>Cancelar</button>
                                <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Agregar</button>
                            </div>
                        </div>

                    </div>
                </form>
        </div>
    </>)

}
export default Add

