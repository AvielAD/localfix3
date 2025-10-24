'use client'
import { DeviceInputFormDto } from "@/DTOS/equipos/devices";
import { GenericModel2Dto, GenericModelDto } from "@/DTOS/genericdto/generic.dto";
import { fetcher } from "@/Utilities/FetchHelper/Fetch.helper";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import useSWR from "swr";
import { number, object, string } from "yup";

const Add = (params: { OnSubmit: (values: DeviceInputFormDto, { resetForm }: any) => void }) => {
    const catbrand = useSWR('/api/category/brand', fetcher)
    const formTicket: DeviceInputFormDto = {
        idBrand: "",
        popularModel: "",
        model: "",
        idCategory: ""
    }

    return (
        <Formik
            initialValues={formTicket}
            onSubmit={params.OnSubmit}
            validationSchema={addSchema}
        >
            {
                (props: FormikProps<any>) => (
                    <Form className="">
                        <div className="grid grid-cols-1 px-4 py-1 mb-8 bg-white rounded-lg shadow-md dark:bg-secondary-800">

                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Categoria</span>
                                <Field name="idCategory" component="select" className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-hidden focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input`}>
                                    <option value="0">Seleccionar</option>
                                    <option value="1">SmartPhone</option>
                                    <option value="2">Laptop</option>
                                    <option value="3">PC Escritorio</option>
                                    <option value="4">Bocinas Portatiles</option>
                                    <option value="5">Consolas Videojuego</option>
                                    <option value="6">LocalFix</option>
                                    <option value="7">Tablet</option>
                                </Field>
                                <ErrorMessage name="idCategory">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>

                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Marca</span>
                                <Field name="idBrand" component="select" className={`block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-hidden focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input`}>
                                    <option value="0">Seleccionar</option>
                                    {
                                        catbrand.data?.map((item: GenericModel2Dto, index: number) => (
                                            <option key={index} value={item.id}>{item.nombre}</option>
                                        ))
                                    }

                                </Field>

                                <ErrorMessage name="idBrand">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>
                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Modelo Tecnico</span>
                                <Field
                                    name="cost3"
                                    className={`shadow-sm appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-hidden focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="cost3">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>
                            <label className="block text-sm">
                                <span className="text-secondary-700 dark:text-secondary-400">Nombre Popular</span>
                                <Field
                                    name="popularModel"
                                    className={`shadow-sm appearance-none border block w-full mt-1 text-sm dark:border-secondary-600 dark:bg-secondary-700 focus:border-theme3-400 focus:outline-hidden focus:shadow-outline-theme3 dark:text-secondary-300 dark:focus:shadow-outline-secondary form-input focus:ring-2 focus:ring-primary-600`}
                                ></Field>
                                <ErrorMessage name="popularModel">{(msg) => (<div className="text-danger-700">{msg}</div>)}</ErrorMessage>
                            </label>

                            <div className="flex items-center justify-end sm:justify-end mt-4">
                                <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline">Agregar</button>
                            </div>

                        </div>

                    </Form>
                )
            }
        </Formik>)
}

export default Add

const addSchema = object({
    idBrand: number().required('Campo Requerido'),
    popularModel: string().required('Campo Requerido'),
    idCategory: number().required('Campo Requerido'),
})


const customCheck = (props: FieldProps) => (
    <div className="relative max-w-sm w-3/4">
        <input className="" type="checkbox" {...props.field} />
    </div>
)