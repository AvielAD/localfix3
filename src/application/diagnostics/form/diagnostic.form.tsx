'use client'
import { number, object, string } from 'yup';
import { postFetcher, fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import useSWR from "swr";
import { BarBanner } from "@avielad/componentspublish";
import { ServerResponseDto } from "@avielad/componentspublish/dist/customhooks/Dtos/ServerResponse.dto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DiagnosticInput } from "../dtos/diagnostic.dto";
import { DeviceDto } from "../../devices/dtos/devices.dto";
import { GroupServiceDto } from '../../groupservice/dto/groupservice.dto';

const loginSchema = object({
    failureDescription: string().email('Correo no valido').required('Correo obligatorio'),
    repairDescription: string().required('Contraseña obligatoria'),
    idEquip: number().required('Seleccione equipo'),
    idGroupService: number().required('Seleccione equipo'),
    budgetCost: number().required('Costo presupuesto requerido')
})

const Add = (params: { close: Function, toast: (params: ServerResponseDto) => void }) => {
    const dataEquipos = useSWR('/api/equipos/popular', fetcher)
    const dataGroupService = useSWR('/api/group_service', fetcher)
    const {
        register,
        handleSubmit,
        //watch,
        formState: {
            errors,
            isSubmitting,
            //isSubmitted
        } } = useForm({ resolver: yupResolver(loginSchema) })


    const submitAdd = async (values: DiagnosticInput, { resetForm }: any) => {

        postFetcher('/api/diagnosticos/', { ...values }).then((data) => {
            params.toast({ Message: data.message, Succedded: data.succedded })
            if (data.succedded) {
                params.close()
            }
        }).catch((e) => {

        })
    }
    return (<>
        <div className="">
            <form onSubmit={handleSubmit(submitAdd)} className="container px-6 mx-auto grid ">
                <BarBanner title={{ message: `Diagnostico`, icon: "bi bi-clipboard2-pulse-fill" }}></BarBanner>
                <div className="px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">
                    <label className="block text-sm mt-2">
                        <span className="text-secondary-700">Seleccionar Dispositivo</span>
                        <select {...register("idEquip")}
                            className=" border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                        >
                            <option value="">Seleccionar...</option>
                            {
                                dataEquipos.data?.map((item: DeviceDto, index: number) => (
                                    <option key={index} value={item.id}>{item.company} {item.brand} {item.model}</option>
                                ))
                            }
                        </select>
                        {errors.idEquip ? <span className="text-danger-700"> {errors.idEquip.message}</span> : null}

                    </label>
                    <label className="block text-sm mt-2">
                        <span className="text-secondary-700">Seleccionar Categoria Diagnostico</span>
                        <select {...register("idEquip")}
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
                    <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar</button>
                    <button type="button" className="bg-danger-500 hover:bg-danger-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => params.close()}>Cancelar</button>
                </div>
            </form>
        </div>
    </>)
}

export default Add

const addTicketSchema = object({
    descripcionfalla: string().required('Campo Requerido'),
    sugerenciareparacion: string().required('Campo Requerido'),
    costopresupuesto: number().min(1, 'El valor no puede ser negativo').required('Campo Requerido'),
    idequipo: string().required('Campo Requerido')
})


