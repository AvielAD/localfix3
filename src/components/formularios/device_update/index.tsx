'use client'
import { DevicesAssignDto, DevicesAssignFormDto, DevicesAssignInputDto } from "@/DTOS/equipos/devices";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import { number, object, string } from "yup";

const Add = (params: { values:DevicesAssignDto | null, setValues: (params: DevicesAssignInputDto) => void}) => {

    const formTicket: DevicesAssignFormDto = {
        idEquipo: "",
    }

    const submitAdd = async (values: DevicesAssignFormDto, { resetForm }: any) => {
        
        let dataupdate:DevicesAssignInputDto = {
            idEquipo: params.values?.id ?? 0,
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
                                    className={`shadow-sm appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-hidden focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="costSale">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>

                            <div className="flex items-center justify-end sm:justify-end mt-4">
                                <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Actualizar</button>
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