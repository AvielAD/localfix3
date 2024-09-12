'use client'
import { DiagnosticoFormDto, DiagnosticoInputDto, DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos";
import { DevicesDto } from "@/DTOS/equipos/devices";
import { modalpropsdto } from "@/DTOS/modalgeneral/modal.dto";
import { ReparacionFirstDto, ReparacionFirstInputDto } from "@/DTOS/reparaciones/reparacion";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { date, number, object, string } from 'yup';

const addFetcher = async (url: string, data: ReparacionFirstDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const getFetch = async (url: string) => fetch(url, { method: "GET" }).then(r => r.json())

const Add = (props: modalpropsdto) => {
    const dataEquipos = useSWR('/api/equipos', getFetch)

    const router = useRouter()
    const formTicket = {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaentrega: '',
        costototal: '0',
        descripcionfalla: '',
        sugerenciareparacion: '',
        idequipo: '0'
    } as ReparacionFirstInputDto

    const submitAdd = async (values: ReparacionFirstInputDto) => {
        console.log(values)
        
        let newRepair = { 
            nameClient: values.nombre,
            lastNameClient: values.apellido,
            phoneNumberClient: values.telefono,
            dateDelivery: new Date(values.fechaentrega),
            totalCost: parseFloat(values.costototal),
            failureDescription: values.descripcionfalla,
            repairDescription: values.sugerenciareparacion,
            idEquip: parseInt(values.idequipo)
         } as ReparacionFirstDto

        addFetcher('/api/reparaciones/first', newRepair).then((data)=>{
            if(data.succeeded){
                router.push('/dashboard/reparaciones')
            }
        }).catch((e)=>{
            console.log(e)

        })


    }
    return (<>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="text-white">
                    <div className="h4">Reparacion</div>
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

                                    <label>Nombre</label>
                                    <Field
                                        name="nombre"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="nombre">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <label>Apellido</label>
                                    <Field
                                        name="apellido"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="apellido">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    <label>Telefono</label>
                                    <Field
                                        name="telefono"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="telefono">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <label>Fecha Entrega</label>
                                    <Field
                                        name="fechaentrega"
                                        className="form-control"
                                        component={customDate}
                                    ></Field>
                                    <ErrorMessage name="fechaentrega">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    <label>Descripcion Falla</label>
                                    <Field
                                        name="descripcionfalla"
                                        className="form-control"
                                        as="textarea"
                                        rows={5}
                                    ></Field>
                                    <ErrorMessage name="descripcionfalla">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    
                                    <label>Sugerencia Reparacion</label>
                                    <Field
                                        name="sugerenciareparacion"
                                        className="form-control"
                                        as="textarea"
                                        rows={5}
                                    ></Field>
                                    <ErrorMessage name="sugerenciareparacion">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <label>Costo Total</label>
                                    <Field
                                        name="costototal"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="costototal">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    

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
    nombre: string().required('Campo Requerido'),
    apellido: string().required('Campo Requerido'),
    telefono: string().required('Campo Requerido'),
    fechaentrega: date().required('Campo Requerido'),
    descripcionfalla: string().required('Campo Requerido'),
    sugerenciareparacion: string().required('Campo Requerido'),
    costototal: number().min(1, 'El valor no puede ser negativo').required('Campo Requerido'),
    idequipo: number().min(1, 'Seleccione una Opcion').typeError('Seleccione una Opcion').required('Seleccione una opcion')
})

const customDate = (props: FieldProps)=>(
    <div>
        <input className="form-control" type="date" {...props.field}  />
    </div>
)