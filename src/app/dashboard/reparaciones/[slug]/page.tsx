'use client'
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ReparacionInputDto } from '@/DTOS/reparaciones/reparacion';

const addFetcher = async (url: string, data: ReparacionInputDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const FormularioDynamic = ({ params }: { params: { slug: string } }) => {
    const [formRepair, setFormRepair] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        fechaentrega: "",
        costototal: "",
        iddiagnostico: params.slug.toString()
    })
    const router = useRouter()

    const onSubmitAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formRepair)
        const newRepair: ReparacionInputDto = {
            ...formRepair,
            fechaentrega: new Date(formRepair.fechaentrega),
            costototal: parseFloat(formRepair.costototal),
            iddiagnostico: parseInt(formRepair.iddiagnostico)
        }

        addFetcher('/api/reparaciones', newRepair).then((data)=>{
            console.log(data)
            if(data.succeeded)
                router.push('/dashboard/reparaciones')
        })
    }

    return (
        <>

            <h1 className="text-center">Agregar Reparacion</h1>
            <form onSubmit={onSubmitAdd} className="m-3">
                <label className="form-label">Nombre Cliente: </label>
                <input
                    className="form-control"
                    type="text"
                    value={formRepair.nombre}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                nombre: e.target.value
                            })
                    }

                />


                <label className="form-label">Apellido Cliente</label>
                <input className="form-control"
                    type="text"
                    value={formRepair.apellido}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                apellido: e.target.value
                            })
                    }
                />

                <label className="form-label">Telefono</label>
                <input className="form-control"
                    type="text"
                    value={formRepair.telefono}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                telefono: e.target.value
                            })
                    }
                />
                <label className="form-label">Fecha Entrega</label>
                <input className="form-control" type="date" 
                value={formRepair.fechaentrega}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormRepair({
                        ...formRepair,
                        fechaentrega: e.target.value
                    })
                }  />



                <label className="form-label">Costo Total Reparacion</label>
                <input name="costo presupuesto" className="form-control"
                    type="text"
                    value={formRepair.costototal}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
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

export default FormularioDynamic