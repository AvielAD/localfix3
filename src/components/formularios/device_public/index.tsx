'use client'
import { ReparacionInputByFilters, ReparacionInputByFiltersForm } from "@/DTOS/reparaciones/reparacion";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import { DateTime } from "luxon";

const Add = (params: { setValues: (params: {name: string}) => void }) => {

    const formTicket: {name: string} = {name: ""}

    const submitAdd = async (values: {name:string}, { resetForm }: any) => {
        let filter = {
            name: values.name,
        } as {name: string}
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
                                <span className="text-secondary-700 dark:text-secondary-400">Busqueda</span>
                                <Field
                                    name="name"
                                    className={`shadow appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
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

