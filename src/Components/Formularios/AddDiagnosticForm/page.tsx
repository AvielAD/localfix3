'use client'
import { DiagnosticoInputDto, DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos";
import { modalpropsdto } from "@/DTOS/modalgeneral/modal.dto";
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { number, object, string } from 'yup';

const addFetcher = async (url: string, data: DiagnosticoInputDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const getFetch = async (url: string) => fetch(url, { method: "GET" }).then(r => r.json())

const Add = (props: modalpropsdto) => {
    const dataEquipos = useSWR('/api/equipos', getFetch)

    const router = useRouter()
    const formTicket = {
        idequipo: 0,
        cliente: '',
        descripcionfalla: '',
        sugerenciareparacion: '',
        costopresupuesto: 0
    } as DiagnosticoInputDto

    const submitAdd = async (values: DiagnosticoInputDto) => {
        props.close(false)
    }

    return (<>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 col-10">
                    <div className="h3 text-center">Agregar Ticket</div>
                    <Formik
                        initialValues={formTicket}
                        onSubmit={submitAdd}
                        validationSchema={addTicketSchema}
                    >
                        {
                            (props: FormikProps<any>) => (
                                <Form>
                                    <Field as="select" name="idequipo" className="form-select">
                                        <option value={0}>Seleccionar Equipo...</option>
                                        {
                                            dataEquipos?.data?.map((item: DiagnosticosDto, index: number) => {
                                                return <option key={index} value={item.id}>{item.nombre}</option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="idequipo">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <Field
                                        name="cliente"
                                        className="form-control mt-4"
                                    ></Field>
                                    <ErrorMessage name="cliente">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <Field
                                        name="descripcionfalla"
                                        className="form-control mt-4"
                                    ></Field>
                                    <ErrorMessage name="descricionfalla">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    
                                    <Field
                                        name="sugerenciareparacion"
                                        className="form-control mt-4"
                                    ></Field>
                                    <ErrorMessage name="sugerenciareparacion">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <Field
                                        name="costopresupuesto"
                                        className="form-control mt-4"
                                        as="number"
                                    ></Field>
                                    <ErrorMessage name="costopresupuesto">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    

                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="mt-5 btn btn-primary col-8">Agregar</button>
                                    </div>
                                </Form>
                            )
                        }

                    </Formik>
                </div>
            </div>
        </div>
    </>)
}

export default Add


const addTicketSchema = object({
    cliente: string().required('Campo Requerido'),
    descripcionfalla: string().required('Campo Requerido'),
    sugerenciareparacion: string().required('Campo Requerido'),
    costopresupuesto: number().min(1, 'El valor no puede ser negativo').required('Campo Requerido'),
    idequipo: number().min(1, 'Seleccione una Opcion').typeError('Seleccione una Opcion').required('Seleccione una opcion')
})
