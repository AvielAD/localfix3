'use client'
import { DevicesDto } from "@/DTOS/equipos/devices"
import { ReparacionFirstDto, ReparacionFirstInputDto } from "@/DTOS/reparaciones/reparacion"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const getFetcher = async (url: string) => fetch(url, { method: "GET" }).then(r => r.json())
const addFetcher = async (url: string, data: ReparacionFirstDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const compareBrandEquipos = (a: DevicesDto, b: DevicesDto) => {
    if (a.brand.toLocaleLowerCase() < b.brand.toLocaleLowerCase())
        return -1
    if (a.brand.toLocaleLowerCase() > b.brand.toLocaleLowerCase())
        return 1
    return 0
}
const First = () => {
    const [dataEquipos, setDataEquipos] = useState<Array<DevicesDto>>([])
    const [formReparacion, setFormReparacion] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        fechaentrega: '',
        costototal: '',
        descripcionfalla: '',
        sugerenciareparacion: '',
        idequipo: ''
    } as ReparacionFirstInputDto)
    const router = useRouter()

    useEffect(() => {
        getFetcher('/api/equipos').then((data) => {
            setDataEquipos(data.sort(compareBrandEquipos))
        })

    }, [])

    const onSubmitAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newReparacion = {
            nombre: formReparacion.nombre,
            apellido: formReparacion.apellido,
            telefono: formReparacion.telefono,
            descripcionfalla: formReparacion.descripcionfalla,
            sugerenciareparacion: formReparacion.sugerenciareparacion,
            fechaentrega: new Date(formReparacion.fechaentrega),
            costototal: parseFloat(formReparacion.costototal),
            idequipo: parseInt(formReparacion.idequipo)
        } as ReparacionFirstDto
        //console.log(newReparacion)
                addFetcher('/api/reparaciones/first', newReparacion).then((data)=>{
                  if(data.succeeded)
                    router.push('/dashboard/reparaciones')
          })

    }

    return (
        <>
            <h1 className="text-center">Agregar Reparacion</h1>

            <form onSubmit={onSubmitAdd} className="m-3">

                <label className="form-label">Seleccionar Equipo</label>
                <select
                    onChange={
                        (e: ChangeEvent<HTMLSelectElement>) =>
                            setFormReparacion({
                                ...formReparacion,
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

                <label className="form-label">Nombre</label>
                <input
                    className="form-control"
                    type="text"
                    value={formReparacion.nombre}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormReparacion({
                                ...formReparacion,
                                nombre: e.target.value
                            })
                    }
                />

                <label className="form-label">Apellido</label>
                <input
                    className="form-control"
                    type="text"
                    value={formReparacion.apellido}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormReparacion({
                                ...formReparacion,
                                apellido: e.target.value
                            })
                    }
                />

                <label className="form-label">Telefono</label>
                <input
                    className="form-control"
                    type="text"
                    value={formReparacion.telefono}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormReparacion({
                                ...formReparacion,
                                telefono: e.target.value
                            })
                    }
                />



                <label className="form-label">Descripcion Falla</label>
                <input
                    className="form-control"
                    type="text"
                    value={formReparacion.descripcionfalla}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormReparacion({
                                ...formReparacion,
                                descripcionfalla: e.target.value
                            })
                    }
                />

                <label className="form-label">Sugerencia Reparacion</label>
                <input
                    className="form-control"
                    type="text"
                    value={formReparacion.sugerenciareparacion}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormReparacion({
                                ...formReparacion,
                                sugerenciareparacion: e.target.value
                            })
                    }
                />

                <label className="form-label">Fecha Entrega</label>
                <input className="form-control" type="date"
                    value={formReparacion.fechaentrega}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormReparacion({
                                ...formReparacion,
                                fechaentrega: e.target.value
                            })
                    } />

                <label className="form-label">Costo Total Reparacion</label>
                <input name="costo presupuesto" className="form-control"
                    type="text"
                    value={formReparacion.costototal}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormReparacion({
                                ...formReparacion,
                                costototal: e.target.value
                            })
                    }
                />
                <button className="mt-5 btn btn-primary"
                    type="submit"
                >Agregar</button>
            </form>
        </>
    )
}

export default First