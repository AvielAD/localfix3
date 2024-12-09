'use client'
import { ReparacionInputByFilters, ReparacionInputByFiltersForm } from "@/DTOS/reparaciones/reparacion";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import { DateTime } from "luxon";

const Add = (params: { setValues: (params: ReparacionInputByFilters) => void }) => {

    const formTicket: ReparacionInputByFiltersForm = {
        name: "",
        idState: "",
        dateStart: "",
        dateEnd: "",
        typeDateSearch: ""
    }

    const submitAdd = async (values: ReparacionInputByFiltersForm, { resetForm }: any) => {
        let filter = {
            dateStart: values.dateStart === "" ? null : DateTime.fromISO(values.dateStart).toISODate(),
            dateEnd: values.dateStart === "" ? null : DateTime.fromISO(values.dateEnd).toISODate(),
            name: values.name,
            idState: values.idState === "" ? 0 : parseInt(values.idState),
            typeDateSearch: values.typeDateSearch === "" ? 0 : parseInt(values.typeDateSearch)
        } as ReparacionInputByFilters
        params.setValues(filter)
    }
    return (
        <Formik
            initialValues={formTicket}
            onSubmit={submitAdd}
        >
            {
                (props: FormikProps<any>) => (
                    <Form className="">
                        <div className="grid grid-cols-2 px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">
                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Estado</span>
                                <Field name="idState" component="select" className="block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input">
                                    <option value="0">Todas</option>
                                    <option value="2">Iniciadas</option>
                                    <option value="3">Pausadas</option>
                                    <option value="4">Canceladas</option>
                                    <option value="5">Terminadas</option>
                                    <option value="6">Entregadas</option>
                                </Field>
                            </label>

                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Tipo Fecha</span>
                                <Field name="typeDateSearch" component="select" className="block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input">
                                    <option value="0">Todas</option>
                                    <option value="1">Recepcion</option>
                                    <option value="2">Entrega</option>
                                    <option value="3">Estado Reciente</option>
                                </Field>
                            </label>
                            <label className="">
                                <span className="text-secondary-700 dark:text-secondary-400">Fecha Inicial</span>
                                <Field
                                    name="dateStart"
                                    component={customDate}
                                ></Field>
                                <ErrorMessage name="dateStart">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>

                            <label className="">
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
                                    className={`shadow appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="costototal">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>
                            <div className="flex items-center justify-end sm:justify-end mt-4">
                                <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Buscar</button>
                            </div>

                        </div>

                    </Form>
                )
            }
        </Formik>)
}

export default Add

const customDate = (props: FieldProps) => (
    <div className="">
        <input className=" mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input outline-none focus:ring-2 focus:ring-blue-600" type="date" {...props.field} />
    </div>
)
