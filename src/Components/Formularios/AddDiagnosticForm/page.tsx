'use client'
import { DiagnosticoFormDto, DiagnosticoInputDto, DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos";
import { DevicesDto } from "@/DTOS/equipos/devices";
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
        idequipo: '0',
        descripcionfalla: '',
        sugerenciareparacion: '',
        costopresupuesto: '0',
        cliente: 'N/A'
    } as DiagnosticoFormDto

    const submitAdd = async (values: DiagnosticoFormDto) => {
        console.log(values)
        let newDiagnostic = { 
            cliente: values.cliente,
            descripcionfalla: values.descripcionfalla,
            sugerenciareparacion: values.sugerenciareparacion,
            costopresupuesto: parseFloat(values.costopresupuesto),
            idequipo: parseInt(values.idequipo)
         } as DiagnosticoInputDto
        addFetcher('/api/diagnosticos', newDiagnostic).then((data)=>{
            if(data.succeeded){
                console.log('peticion exitosa')
                router.push('/dashboard/diagnosticos')
                props.close(false)
            }
        }).catch((e)=>{
        })


    }
    return (<>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="text-white">
                    <div className="h4">Diagnostico</div>
                    <Formik
                        initialValues={formTicket}
                        onSubmit={submitAdd}
                        validationSchema={addTicketSchema}
                    >
                        {
                            (props: FormikProps<any>) => (
                                <Form>
                                    <label>Equipo</label>
                                    <Field as="select" name="idequipo" className="form-select text-dark">
                                        <option value={0}>Seleccionar Equipo...</option>
                                        {
                                            dataEquipos?.data?.map((item: DevicesDto, index: number) => {
                                                return <option key={index} value={item.id}>{item.brand} {item.model} </option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="idequipo">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    <label>Descripcion Falla</label>
                                    <Field
                                        name="descripcionfalla"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="descripcionfalla">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    
                                    <label>Sugerencia Reparacion</label>
                                    <Field
                                        name="sugerenciareparacion"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="sugerenciareparacion">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <label>Equipo</label>
                                    <Field
                                        name="costopresupuesto"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="costopresupuesto">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    

                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary col-8">Agregar</button>
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
    descripcionfalla: string().required('Campo Requerido'),
    sugerenciareparacion: string().required('Campo Requerido'),
    costopresupuesto: number().min(1, 'El valor no puede ser negativo').required('Campo Requerido'),
    idequipo: number().min(1, 'Seleccione una Opcion').typeError('Seleccione una Opcion').required('Seleccione una opcion')
})
