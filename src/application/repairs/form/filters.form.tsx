'use client'
import { RepairByFilters } from "../dto/repair.dto";
import { useForm } from "react-hook-form";

const Add = (props: { OnSubmit: (values: RepairByFilters) => void }) => {

    const { register, handleSubmit, formState: { errors } } =
        useForm({  defaultValues:{
            state: 0,
            dateStart: null,
            dateEnd: null,
            typeDateSearch:0
        }})

    const submitAdd = async (values: any) => {
        props.OnSubmit({...values, states: [values.state]})
    }
    return (
        <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto grid ">
                <div className="grid grid-cols-2 gap-2 px-4 py-1 mb-8 bg-white rounded-lg shadow-md">
                    <label className="block text-sm">
                        <span className="text-secondary-700 dark:text-secondary-400">Estado</span>
                        <select {...register("state")} 
                        className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                            <option value="0">Todas</option>
                            <option value="2">Iniciadas</option>
                            <option value="3">Pausadas</option>
                            <option value="4">Canceladas</option>
                            <option value="5">Terminadas</option>
                            <option value="6">Entregadas</option>
                        </select>
                    </label>

                    <label className="block text-sm">
                        <span className="text-secondary-700 dark:text-secondary-400">Tipo Fecha</span>
                        <select {...register("typeDateSearch")} 
                        className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                            <option value="0">Todas</option>
                            <option value="1">Recepcion</option>
                            <option value="2">Entrega</option>
                            <option value="3">Estado Reciente</option>
                        </select>
                    </label>
                    <label className="">
                        <span className="text-secondary-700 dark:text-secondary-400">Fecha Inicial</span>
                        <input
                            className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            type="date"
                            {...register("dateStart")}
                        ></input>
                    </label>
                    <label className="">
                        <span className="text-secondary-700 dark:text-secondary-400">Fecha final</span>
                        <input
                            className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            type="date"
                            {...register("dateEnd")}
                        ></input>
                    </label>

                    <div className="flex items-center justify-end sm:justify-end mt-4">
                        <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Buscar</button>
                    </div>

                </div>
        </form>)
}

export default Add

