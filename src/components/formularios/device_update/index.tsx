'use client'
import { DevicesAssignDto, DevicesAssignFormDto, DevicesAssignInputDto } from "@/DTOS/equipos/devices";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import { number, object, string } from "yup";

const Add = (params: { values:DevicesAssignDto | null, setValues: (params: DevicesAssignInputDto) => void}) => {

    const formTicket: DevicesAssignFormDto = {
        idEquipo: "",
        cost1: "",
        cost2: "",
        cost3: "",
        costSale: "",
        visiblePanelPublic: true
    }

    const submitAdd = async (values: DevicesAssignFormDto, { resetForm }: any) => {
        
        let dataupdate:DevicesAssignInputDto = {
            idEquipo: params.values?.id ?? 0,
            cost1: values.cost1 === "" ? -1 : parseFloat(values.cost1),
            cost2: values.cost2 === "" ? -1 :parseFloat(values.cost2),
            cost3: values.cost3 === "" ? -1 :parseFloat(values.cost3),
            costSale: values.costSale === "" ? -1 : parseFloat(values.costSale),
            visiblePanelPublic: values.visiblePanelPublic
        } 
        params.setValues(dataupdate)
        resetForm()
    }
    return (
        <Formik
            initialValues={formTicket}
            onSubmit={submitAdd}
            validationSchema={addSchema}
        >
            {
                (props: FormikProps<any>) => (
                    <Form className="">
                        <div className="grid grid-cols-1 px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">
                            <label htmlFor="">{params.values?.brand + " " + params.values?.model}</label>
                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Costo OLED</span>
                                <Field
                                    name="costSale"
                                    className={`shadow appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="costSale">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>

                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Costo LCD</span>
                                <Field
                                    name="cost1"
                                    className={`shadow appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="cost1">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>

                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Costo Incell Short</span>
                                <Field
                                    name="cost2"
                                    className={`shadow appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="cost2">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>
                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Costo Incell Big</span>
                                <Field
                                    name="cost3"
                                    className={`shadow appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-none focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="cost3">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>
                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Visible Panel Cotizador</span>
                                <Field
                                    name="visiblePanelPublic"
                                    component= {customCheck}
                                ></Field>
                                <ErrorMessage name="visiblePanelPublic">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>
                            <div className="flex items-center justify-end sm:justify-end mt-4">
                                <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Actualizar</button>
                            </div>

                        </div>

                    </Form>
                )
            }
        </Formik>)
}

export default Add

const addSchema = object({
    cost1: number().typeError("Valor Incorrecto"),
    cost2: number().typeError("Valor Incorrecto"),
    cost3: number().typeError("Valor Incorrecto"),
    costSale: number().typeError("Valor Incorrecto"),
})


const customCheck = (props: FieldProps) => (
    <div className="relative max-w-sm w-3/4">
        <input className="" type="checkbox" defaultChecked={true} {...props.field} />
    </div>
)