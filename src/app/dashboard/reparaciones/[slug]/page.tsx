'use client'
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ReparacionInputDto } from '@/DTOS/reparaciones/reparacion';
import { UpdateDiagnosticoInputDto } from '@/components/new/components/formularios/diagnostic_add/dtos/diagnosticos';

const addFetcher = async (url: string, data: ReparacionInputDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const updateFetcherDiag = async (url: string, data: UpdateDiagnosticoInputDto) => fetch(url, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json())

const FormularioDynamic = ({ params }: { params: { slug: string } }) => {
    const [formRepair, setFormRepair] = useState({
        nameClient: "",
        lastNameClient: "",
        phoneNumberClient: "",
        emailClient: "",
        dateDelivery: "",
        totalCost: "",
        idDiagnostic: params.slug.toString()
    } )
    const [formUpdateDiag, setFormUpdateDiag] = useState({} as UpdateDiagnosticoInputDto)

    const router = useRouter()

    const onSubmitAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newRepair: ReparacionInputDto = {
            ...formRepair,
            dateDelivery: new Date(formRepair.dateDelivery),
            totalCost: parseFloat(formRepair.totalCost),
            idDiagnostic: parseInt(formRepair.idDiagnostic)
        }

        addFetcher('/api/reparaciones', newRepair).then((data) => {
                if(formUpdateDiag.descripcionfalla !== "" && formUpdateDiag.sugerenciareparacion !== ""){
                    updateFetcherDiag('/api/diagnosticos',formUpdateDiag).then((data)=>{
                            router.push('/dashboard/reparaciones')
                    })
                }
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
                    value={formRepair.nameClient}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                nameClient: e.target.value
                            })
                    }

                />


                <label className="form-label">Apellido Cliente</label>
                <input className="form-control"
                    type="text"
                    value={formRepair.lastNameClient}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                lastNameClient: e.target.value
                            })
                    }
                />

                <label className="form-label">Telefono</label>
                <input className="form-control"
                    type="text"
                    value={formRepair.phoneNumberClient}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                phoneNumberClient: e.target.value
                            })
                    }
                />
                <label className="form-label">Fecha Entrega</label>
                <input className="form-control" type="date"
                    value={formRepair.dateDelivery}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                dateDelivery: e.target.value
                            })
                    } />

                <label className="form-label">Falla</label>
                <input className="form-control"
                    type="text"
                    value={formUpdateDiag.descripcionfalla}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormUpdateDiag({
                                ...formUpdateDiag,
                                descripcionfalla: e.target.value
                            })
                    }
                />

                <label className="form-label">Reparacion</label>
                <input className="form-control"
                    type="text"
                    value={formUpdateDiag.sugerenciareparacion}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormUpdateDiag({
                                ...formUpdateDiag,
                                sugerenciareparacion: e.target.value
                            })
                    }
                />

                <label className="form-label">Costo Total Reparacion</label>
                <input name="costo presupuesto" className="form-control"
                    type="text"
                    value={formRepair.totalCost}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormRepair({
                                ...formRepair,
                                totalCost: e.target.value
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