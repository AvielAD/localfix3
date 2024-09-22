'use client'
import { DiagnosticoFormDto, DiagnosticoInputDto, DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos";
import { DevicesDto } from "@/DTOS/equipos/devices";
import { modalpropsdto } from "@/DTOS/modalgeneral/modal.dto";
import { ReparacionFirstDto, ReparacionFirstInputDto } from "@/DTOS/reparaciones/reparacion";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { date, number, object, string } from 'yup';
import { fetcher, addFetcher } from '@/Utilities/FetchHelper/Fetch.helper'

const Add = (params: { close: Function }) => {
    const dataEquipos = useSWR('/api/equipos', fetcher)

    const router = useRouter()
    const formTicket = {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaentrega: '',
        costototal: '0',
        descripcionfalla: '',
        sugerenciareparacion: '',
        idequipo: '0'
    } as ReparacionFirstInputDto

    const submitAdd = async (values: ReparacionFirstInputDto) => {
        console.log(values)

        let newRepair = {
            nameClient: values.nombre,
            lastNameClient: values.apellido,
            phoneNumberClient: values.telefono,
            dateDelivery: new Date(values.fechaentrega),
            totalCost: parseFloat(values.costototal),
            failureDescription: values.descripcionfalla,
            repairDescription: values.sugerenciareparacion,
            idEquip: parseInt(values.idequipo)
        } as ReparacionFirstDto

        addFetcher('/api/reparaciones/first', newRepair).then((data) => {
            if (data.succeeded) {
                router.push('/dashboard/reparaciones')
            }
        }).catch((e) => {
            console.log(e)

        })


    }
    if (!dataEquipos.data) return <>loading...</>

    return (<>
        <div className="p-8 w-full rounded-xl ">
            <Formik
                initialValues={formTicket}
                onSubmit={submitAdd}
                validationSchema={addTicketSchema}
            >
                {
                    (props: FormikProps<any>) => (
                        <Form>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Equipo</label>
                                <Field name="idequipo">
                                    {({ field, form, meta }: FieldProps) => (
                                        <div>
                                            <input type="search" list="list" autoComplete="on" id="" 
                                                className={`ring-1 w-3/4 sm:w-full rounded-md outline-none focus:ring-2 focus:ring-blue-600 ${props.errors.idequipo && props.touched.idequipo ? "ring-red-600" : ""}`}
                                            />
                                            <datalist id="list">
                                                {
                                                    dataEquipos.data?.map((item: DevicesDto, index: number) => {
                                                        return <option key={index} data-value={item.id} value={item.model}>{item.model} {item.company}</option>
                                                    })
                                                }
                                            </datalist>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                                <Field
                                    name="nombre"
                                    className={`ring-1 w-3/4 sm:w-full rounded-md outline-none focus:ring-2 focus:ring-blue-600 ${props.errors.nombre && props.touched.nombre ? "ring-red-600" : ""}`}
                                ></Field>
                            </div>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                                <Field
                                    name="apellido"
                                    className={`ring-1 w-3/4 sm:w-full rounded-md outline-none focus:ring-2 focus:ring-blue-600 ${props.errors.apellido && props.touched.apellido ? "ring-red-600" : ""}`}
                                ></Field>
                            </div>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Telefono</label>
                                <Field
                                    name="telefono"
                                    className={`ring-1 w-3/4 rounded-md outline-none focus:ring-2 focus:ring-blue-600 ${props.errors.telefono && props.touched.telefono ? "ring-red-600" : ""}`}
                                ></Field>
                            </div>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Fecha Entrega</label>
                                <Field
                                    name="fechaentrega"
                                    component={customDate}
                                ></Field>
                                <ErrorMessage name="fechaentrega">{(msg) => (<div className="">{msg}</div>)}</ErrorMessage>
                            </div>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Descripcion Falla</label>
                                <Field
                                    name="descripcionfalla"
                                    className={`ring-1 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-600 ${props.errors.descripcionfalla && props.touched.descripcionfalla ? "ring-red-600" : ""}`}
                                    as="textarea"
                                    rows={3}
                                ></Field>
                            </div>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Sugerencia Reparacion</label>
                                <Field
                                    name="sugerenciareparacion"
                                    className={`ring-1 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-600 ${props.errors.sugerenciareparacion && props.touched.sugerenciareparacion ? "ring-red-600" : ""}`}
                                    as="textarea"
                                    rows={3}
                                ></Field>
                            </div>
                            <div className="m-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Costo Total</label>
                                <Field
                                    name="costototal"
                                    className={`ring-1 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-600`}
                                ></Field>
                                <ErrorMessage name="costototal">{(msg) => (<div className="">{msg}</div>)}</ErrorMessage>
                            </div>

                            <div className="flex items-center justify-center sm:justify-between mt-5">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => params.close()}>Cancelar</button>
                            </div>
                        </Form>
                    )
                }

            </Formik>
        </div>
    </>)
}

export default Add


const addTicketSchema = object({
    nombre: string().required('Campo Requerido'),
    apellido: string().required('Campo Requerido'),
    telefono: string().required('Campo Requerido'),
    fechaentrega: date().required('Campo Requerido'),
    descripcionfalla: string().required('Campo Requerido'),
    sugerenciareparacion: string().required('Campo Requerido'),
    costototal: number().min(1, 'El valor no puede ser negativo').required('Campo Requerido'),
    idequipo: number().min(1, 'Seleccione una Opcion').typeError('Seleccione una Opcion').required('Seleccione una opcion')
})

const customDate = (props: FieldProps) => (

    <div className="relative max-w-sm w-3/4">
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" {...props.field} />
    </div>
)
