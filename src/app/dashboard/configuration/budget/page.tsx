'use client'
import { postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner, Modal, Toast, useToast } from "@avielad/componentspublish"
import { useEffect, useState } from "react"
import FormFilters from '@/application/devices/forms/devicepublic.form'
import CardPricing from '@/components/cards/cardpricing'
import { BudgetDto } from '@/application/budget/dtos/budget.dto'
import FormRepairNew from '@/application/repairs/form/addrepairfill.form'
import FormDiagnosticNew from '@/application/diagnostics/form/diagnosticfill.form'
import { InputFill } from '@/DTOS/reparaciones/reparacion'

const Reparaciones = () => {
    const [history, setHistory] = useState([] as Array<BudgetDto>)
    const [fillData, setFillData] = useState({} as InputFill)
    const [filters, setFilters] = useState({ name: "" })
    const [showModalRepair, setShowModalRepair] = useState(false)
    const [showModalDiag, setShowModalDiag] = useState(false)
    const Toast1 = useToast();



    useEffect(() => {

        if (filters.name !== "") {
            postFetcher(`/api/budget/byfilters`, { title: filters.name }).then((data) => {
                setHistory(data)
            })
        }
    }, [filters])

    const setActionModalRepair = async (fill?: InputFill) => {
        if (fill) {
            setFillData(fill)
        }
        setShowModalRepair(!showModalRepair)
    }

    const setActionModalDiag = async (fill?: InputFill) => {
        if (fill) {
            setFillData(fill)
        }
        setShowModalDiag(!showModalDiag)
    }
    return (
        <div className="">
            <Toast Show={Toast1.toast.show} ServerMessage={Toast1.toast.response}></Toast>

            <Modal show={showModalRepair} close={() => setActionModalRepair()} styles='p-2'>
                <div className='overflow-y-scroll h-[400] '>
                    <FormRepairNew fill={fillData} toast={Toast1.changeToast} close={() => setActionModalRepair()}></FormRepairNew>
                </div>
            </Modal>

            <Modal show={showModalDiag} close={() => setActionModalDiag()}>
                <div className='overflow-y-scroll h-[400] '>

                    <FormDiagnosticNew fill={fillData} toast={Toast1.changeToast} close={() => setActionModalDiag()}></FormDiagnosticNew>
                </div>
            </Modal>
            <BarBanner title={{ message: "Panel Presupuestos", icon: "bi bi-calculator-fill" }}>
                <FormFilters setValues={setFilters}></FormFilters>
            </BarBanner>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                {
                    history.map((item: BudgetDto, index: number) =>
                    (<CardPricing key={index}
                        element={{
                            Title: item.equip.nombre,
                            Subtitle: item.title,
                            Subtitle2: item.groupService.nombre,
                            Description: item.description,
                            Cost: item.cost
                        }}
                        consult={()=>setActionModalDiag({
                            idEquip: item.equip.id,
                            nameEquip: item.equip.nombre,
                            idDiagnostic: item.groupService.id,
                            nameDiagnostic: item.groupService.nombre,
                            totalCost: item.cost,
                            failureDescription: "",
                            repairDescription: item.title
                        })}
                        repair={() => setActionModalRepair({
                            idEquip: item.equip.id,
                            nameEquip: item.equip.nombre,
                            idDiagnostic: item.groupService.id,
                            nameDiagnostic: item.groupService.nombre,
                            totalCost: item.cost,
                            failureDescription: "",
                            repairDescription: item.title
                        })}></CardPricing>))

                }
            </div>

        </div>
    )
}

export default Reparaciones