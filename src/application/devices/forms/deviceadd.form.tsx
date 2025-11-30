'use client'
import { DeviceInputDto } from "@/DTOS/equipos/devices";
import { GenericModel2Dto } from "@/DTOS/genericdto/generic.dto";
import { fetcher } from "@/Utilities/FetchHelper/Fetch.helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { number, object, string } from "yup";

const schemaValidation = object({
    idBrand: number(),
    popularModel: string(),
    technicalModel: string(),
    idCategory: number(),
})

const Add = (params: { OnSubmit: (values: DeviceInputDto) => void }) => {
    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                idBrand: 0,
                popularModel: "",
                technicalModel: "",
                idCategory: 0
            }
        })
    const catbrand = useSWR('/api/category/brand', fetcher)

    const SumbitInfo = (values: any) => {
        params.OnSubmit({ ...values });
    }

    return (
        <form onSubmit={handleSubmit(SumbitInfo)} className="">
            <div className="grid grid-cols-1 px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">

                <label className="block text-sm">
                    <span className="text-secondary-700 dark:text-secondary-400">Categoria</span>
                    <select {...register("idCategory")} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                        <option value="0">Seleccionar</option>
                        <option value="1">SmartPhone</option>
                        <option value="2">Laptop</option>
                        <option value="3">PC Escritorio</option>
                        <option value="4">Bocinas Portatiles</option>
                        <option value="5">Consolas Videojuego</option>
                        <option value="6">LocalFix</option>
                        <option value="7">Tablet</option>
                    </select>
                    {errors.idCategory ? <span className="text-danger-700"> {errors.idCategory.message}</span> : null}
                </label>

                <label className="block text-sm">
                    <span className="text-secondary-700 dark:text-secondary-400">Marca</span>
                    <select {...register("idBrand")} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                        <option value="0">Seleccionar</option>
                        {
                            catbrand.data?.map((item: GenericModel2Dto, index: number) => (
                                <option key={index} value={item.id}>{item.nombre}</option>
                            ))
                        }

                    </select>
                    {errors.idBrand ? <span className="text-danger-700"> {errors.idBrand.message}</span> : null}
                </label>
                <label className="block text-sm">
                    <span className="text-secondary-700 dark:text-secondary-400">Modelo Tecnico</span>
                    <input
                        {...register("technicalModel")}
                        className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    ></input>
                    {errors.technicalModel ? <span className="text-danger-700"> {errors.technicalModel.message}</span> : null}
                </label>
                <label className="block text-sm">
                    <span className="text-secondary-700 dark:text-secondary-400">Nombre Popular</span>
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
