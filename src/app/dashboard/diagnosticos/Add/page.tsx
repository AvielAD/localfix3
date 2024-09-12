'use client'
import { Curso } from "@/DTOS/curso.dto";
import { DiagnosticoFormDto, DiagnosticoInputDto } from "@/DTOS/diagnosticos/diagnosticos";
import { DevicesDto } from "@/DTOS/equipos/devices";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const addFetcher = async (url: string, data: DiagnosticoInputDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const getFetcher = async (url: string) => fetch(url, { method: "GET" }).then(r => r.json())

const compareBrandEquipos = (a: DevicesDto, b: DevicesDto)=>{
    if(a.brand.toLocaleLowerCase() < b.brand.toLocaleLowerCase())
        return -1
    if(a.brand.toLocaleLowerCase() > b.brand.toLocaleLowerCase())
        return 1
    return 0
}


const Add = () => {
    const [dataEquipos, setDataEquipos] = useState<Array<DevicesDto>>([])
    const [formDiagnostico, setFormDiagnostico] = useState({
        cliente: 'N/A',
        descripcionfalla: '',
        sugerenciareparacion: '',
        costopresupuesto: '',
        idequipo: ''
    } as DiagnosticoFormDto)
    const router = useRouter()
    //agregar curso

    useEffect(() => {
        getFetcher('/api/equipos').then((data) => {
            setDataEquipos(data.sort(compareBrandEquipos))
        })

    }, [])


    const onSubmitAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newDiagnostico = {
            nameClient: formDiagnostico.cliente,
            failureDescription: formDiagnostico.descripcionfalla,
            repairDescription: formDiagnostico.sugerenciareparacion,
            budgetCost: parseFloat(formDiagnostico.costopresupuesto),
            idEquip: parseInt(formDiagnostico.idequipo)
        } as DiagnosticoInputDto

        addFetcher('/api/diagnosticos', newDiagnostico).then((data)=>{
                router.push('/dashboard/diagnosticos')
        })

    }


    return (<>
        <h1 className="text-center">Agregar Diagnostico</h1>
        <form onSubmit={onSubmitAdd} className="m-3">
            <label className="form-label">Seleccionar Equipo</label>
            <select
                onChange={
                    (e: ChangeEvent<HTMLSelectElement>) =>
                        setFormDiagnostico({
                            ...formDiagnostico,
                            idequipo: e.target.value
                        })
                } 
                className="form-select" defaultValue={"DEFAULT"}>

                <option value={"DEFAULT"}> Seleccionar ...</option>
                {
                    dataEquipos.map((item: DevicesDto, index: number) => {
                        return <option key={index} value={item.id.toString()}>{item.brand} {item.model}</option>
                    })
                }

            </select>
            <label className="form-label">Descripcion Falla</label>
            <input
                className="form-control"
                type="text"
                value={formDiagnostico.descripcionfalla}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormDiagnostico({
                            ...formDiagnostico,
                            descripcionfalla: e.target.value
                        })
                }

            />


            <label className="form-label">Sugerencia Reparacion</label>
            <input className="form-control"
                type="text"
                value={formDiagnostico.sugerenciareparacion}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormDiagnostico({
                            ...formDiagnostico,
                            sugerenciareparacion: e.target.value
                        })
                }
            />

            <label className="form-label">Costo Reparacion</label>
            <input name="costopresupuesto" className="form-control"
                type="text"
                value={formDiagnostico.costopresupuesto}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormDiagnostico({
                            ...formDiagnostico,
                            costopresupuesto: e.target.value
                        })
                }
            />

            <button className="mt-5 btn btn-primary"
                type="submit"
            >Agregar</button>
        </form>
    </>)
}

export default Add