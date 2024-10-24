'use client'
import { ReparacionFirstDto, ReparacionFirstInputDto } from "@/DTOS/reparaciones/reparacion";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps, FormikHelpers, FormikState } from "formik";
import { date, number, object, string } from 'yup';
import { postFetcher, fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { DevicesDto } from "@/DTOS/equipos/devices";
import useSWR from "swr";
import { DateTime } from "luxon";
import Banner1 from '@/components/new/components/barbanner'

const Add = (params: { close: Function }) => {
    const dataEquipos = useSWR('/api/equipos/popular', fetcher)

    const formTicket = {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaentrega: '',
        costototal: '0',
        descripcionfalla: '',
        sugerenciareparacion: '',
        idequipo: ""
    } as ReparacionFirstInputDto

    const submitAdd = async (values: ReparacionFirstInputDto, { resetForm }: any) => {

        let newRepair = {
            nameClient: values.nombre,
            lastNameClient: values.apellido,
            phoneNumberClient: values.telefono,
            dateDelivery: DateTime.fromISO(values.fechaentrega).toString(),
            totalCost: parseFloat(values.costototal),
            failureDescription: values.descripcionfalla,
            repairDescription: values.sugerenciareparacion,
            idEquip: parseInt(values.idequipo.split(' ')[0])
        } as ReparacionFirstDto
        console.log(newRepair)

        postFetcher('/api/reparaciones/first', newRepair).then((data) => {
            resetForm()
            params.close()
        }).catch((e) => {

        })
    }
    return (<>
        <div className="">
            <Formik
                initialValues={formTicket}
                onSubmit={submitAdd}
                validationSchema={addTicketSchema}

            >
                {
                    (props: FormikProps<any>) => (
                        <Form className="container px-6 mx-auto grid">
                            <Banner1 title="Reparacion" starmessage="Agregar" arrowmessage=""></Banner1>
                            <div className="px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">
                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Equipo</span>
                                    <Field name="idequipo" >
                                        {({ field, form, meta }: FieldProps) => (
                                            <div>
                                                <input type="search" list="list" autoComplete="on" id="" {...field} placeholder="Seleccionar equipo"
                                                    className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input ${props.errors.idequipo && props.touched.idequipo ? "ring-danger-600" : ""}`}
                                                />
                                                <datalist id="list">
                                                    {
                                                        dataEquipos.data?.map((item: DevicesDto, index: number) => {
                                                            return <option key={index} value={item.id + " " + item.brand + " " + item.model}>{item.model}</option>
                                                        })
                                                    }
                                                </datalist>
                                            </div>
                                        )}
                                    </Field>
                                </label>

                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Nombre</span>
                                    <Field
                                        name="nombre"
                                        className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-primary-600 ${props.errors.nombre && props.touched.nombre ? "ring-red-600" : ""}`}
                                    ></Field>
                                </label>

                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Apellido</span>
                                    <Field
                                        name="apellido"
                                        className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-primary-600 ${props.errors.apellido && props.touched.apellido ? "ring-danger-600" : ""}`}
                                    ></Field>
                                </label>

                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Telefono</span>
                                    <Field
                                        name="telefono"
                                        className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-primary-600 ${props.errors.telefono && props.touched.telefono ? "ring-danger-600" : ""}`}
                                    ></Field>
                                </label>

                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Fecha Entrega</span>
                                    <Field
                                        name="fechaentrega"
                                        component={customDate}
                                    ></Field>
                                    <ErrorMessage name="fechaentrega">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                                </label>

                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Descripcion Falla</span>
                                    <Field
                                        name="descripcionfalla"
                                        className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-primary-600 ${props.errors.descripcionfalla && props.touched.descripcionfalla ? "ring-danger-600" : ""}`}
                                        as="textarea"
                                        rows={3}
                                    ></Field>

                                </label>

                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Sugerencia Reparacion</span>
                                    <Field
                                        name="sugerenciareparacion"
                                        className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-primary-600 ${props.errors.sugerenciareparacion && props.touched.sugerenciareparacion ? "ring-danger-600" : ""}`}
                                        as="textarea"
                                        rows={3}
                                    ></Field>

                                </label>
                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Costo Total</span>
                                    <Field
                                        name="costototal"
                                        className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-primary-600`}
                                    ></Field>
                                    <ErrorMessage name="costototal">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                                </label>
                            </div>

                            <div className="flex items-center justify-between sm:justify-between ">
                                <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar</button>
                                <button type="button" className="bg-danger-500 hover:bg-danger-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => params.close()}>Cancelar</button>
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
    //idequipo: number().min(1, 'Seleccione una Opcion').typeError('Seleccione una Opcion').required('Seleccione una opcion')
    idequipo: string().required('Campo Requerido')
})

const customDate = (props: FieldProps) => (
    <div className="relative max-w-sm w-3/4">
        <input className="block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-blue-600" type="date" {...props.field} />
    </div>
)
