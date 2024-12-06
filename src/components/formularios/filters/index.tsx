'use client'
import { ReparacionInputByFilters, ReparacionInputByFiltersForm } from "@/DTOS/reparaciones/reparacion";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps} from "formik";
import { date, object, string } from 'yup';
import { DateTime } from "luxon";
import { BarBanner } from "@avielad/componentspublish";

const Add = (params: { setValues: (params: ReparacionInputByFilters) => void }) => {

    const formTicket: ReparacionInputByFiltersForm= {
        name: "",
        idState: "",
        dateStart: "",
        dateEnd: ""
    }

    const submitAdd = async (values: ReparacionInputByFiltersForm, { resetForm }: any) => {
        let filter = {
            dateStart: values.dateStart === "" ? null : DateTime.fromISO(values.dateStart).toISODate(),
            dateEnd: values.dateStart === "" ? null : DateTime.fromISO(values.dateEnd).toISODate(),
            name: values.name,
            idState: parseInt(values.idState)
        } as ReparacionInputByFilters
        params.setValues(filter)
    }
    return (<>
        <div className="">
            <Formik
                initialValues={formTicket}
                onSubmit={submitAdd}
                //validationSchema={addTicketSchema}

            >
                {
                    (props: FormikProps<any>) => (
                        <Form className="container px-6 mx-auto grid">
                            <BarBanner title="Reparacion" starmessage="Agregar" arrowmessage=""></BarBanner>
                            <div className="px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">
                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Estado</span>
                                    <Field name="idState" component="select" className= "block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input">
                                        <option value="0">Todas</option>
                                        <option value="2">Iniciadas</option>
                                        <option value="3">Pausadas</option>
                                        <option value="4">Canceladas</option>
                                        <option value="5">Terminadas</option>
                                        <option value="6">Entregadas</option>
                                    </Field>
                                </label>


                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Fecha Inicial</span>
                                    <Field
                                        name="dateStart"
                                        component={customDate}
                                    ></Field>
                                    <ErrorMessage name="dateStart">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                                </label>


                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Fecha final</span>
                                    <Field
                                        name="dateEnd"
                                        component={customDate}
                                    ></Field>
                                    <ErrorMessage name="dateEnd">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                                </label>

                                <label className="block text-sm">
                                    <span className="text-secondary-700 dark:text-secondary-400">Busqueda</span>
                                    <Field
                                        name="name"
                                        className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-primary-600`}
                                    ></Field>
                                    <ErrorMessage name="costototal">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                                </label>
                            </div>

                            <div className="flex items-center justify-between sm:justify-between ">
                                <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Buscar</button>
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
    //idState: string().required('Campo Requerido'),
    //dateStart: date().required('Campo Requerido'),
    //dateEnd: date().required('Campo Requerido'),
    //name: string().required('Campo Requerido')
})

const customDate = (props: FieldProps) => (
    <div className="relative max-w-sm w-3/4">
        <input className="block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-blue-600" type="date" {...props.field} />
    </div>
)