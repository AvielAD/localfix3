'use client'
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps} from "formik";
import {  number, object, string } from 'yup';
import { postFetcher, fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { DevicesDto } from "@/DTOS/equipos/devices";
import useSWR from "swr";
import Banner1 from '@/Components/new/components/barbanner'
import { DiagnosticoFormDto, DiagnosticoInputDto } from "@/Components/new/components/formularios/diagnostic_add/dtos/diagnosticos";

const Add = (params: { close: Function }) => {
    const dataEquipos = useSWR('/api/equipos/popular', fetcher)

    const formTicket = {
        descripcionfalla: "",
        sugerenciareparacion: "",
        costopresupuesto: "",
        idequipo: ""
    } as DiagnosticoFormDto

    const submitAdd = async (values: DiagnosticoFormDto, { resetForm }: any) => {

        let newDiag = {
            nameClient: "Na",
            failureDescription: values.descripcionfalla,
            repairDescription:values.sugerenciareparacion,
            budgetCost: parseFloat(values.costopresupuesto),
            idEquip: parseInt(values.idequipo)
        } as DiagnosticoInputDto

        postFetcher('/api/diagnosticos/', newDiag).then((data) => {
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
                                                            return <option key={index} value={item.id + " " + item.model + " " + item.brand}>{item.model}</option>
                                                        })
                                                    }
                                                </datalist>
                                            </div>
                                        )}
                                    </Field>
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
                                        name="costopresupuesto"
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
    descripcionfalla: string().required('Campo Requerido'),
    sugerenciareparacion: string().required('Campo Requerido'),
    costopresupuesto: number().min(1, 'El valor no puede ser negativo').required('Campo Requerido'),
    idequipo: string().required('Campo Requerido')
})


