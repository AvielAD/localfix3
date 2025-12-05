'use client'
import { postFetcher, putFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner, Modal, Toast, useToast } from "@avielad/componentspublish"
import { useEffect, useState } from "react"
import FormFilters from '@/application/devices/forms/devicepublic.form'
import { BudgetDto, BudgetInputFill, BudgetUpdateDto } from '@/application/budget/dtos/budget.dto'
import TableBudget from '@/application/budget/tables/budget.table'
import FormBudget from '@/application/budget/forms/budgetfill.form'
import { useRouter } from 'next/navigation'


export interface InfoModalDevice {
    show: boolean,
    info: BudgetInputFill | null
}

const Reparaciones = () => {
    const [showModalDevice, setShowModalDevice] = useState({ show: false, info: null } as InfoModalDevice)
    const [history, setHistory] = useState([] as Array<BudgetDto>)
    const [filters, setFilters] = useState({ name: "" })
    const Toast1 = useToast();
    const router = useRouter()

    useEffect(() => {

        if (filters.name !== "") {
            postFetcher(`/api/budget/byfilters`, { title: filters.name }).then((data) => {
                setHistory(data)
            })
        }
    }, [filters])

    const OpenModal = (item: BudgetDto) => {
        setShowModalDevice({ 
            show: true, 
            info: {
                ...item,
                idBudget: item.id,
                idEquip: item.equip.id, 
                nameEquipo: item.equip.nombre, 
                idGroupService: item.groupService.id, 
                nameGroupService: item.groupService.nombre
            }})
    }
    const submitAdd = async (values: BudgetUpdateDto) => {
        putFetcher('/api/budget', {...values}).then(data => {
            Toast1.changeToast({ Message: data.message, Succedded: data.succeeded })
            if (data.succeeded) {
                setShowModalDevice({ show: false, info: null })
                //diagnosticosData.mutate()
            }
        })
    }
    const ActionButton = {
        action: () => { router.push(`/dashboard/configuration/budget/add`) },
        title: "Nuevo",
        icon: "bi bi-clipboard2-plus",
        disabled: false
    }

    return (
        <div className="">
            <Toast Show={Toast1.toast.show} ServerMessage={Toast1.toast.response}></Toast>
            <Modal show={showModalDevice.show} close={() => setShowModalDevice({ show: false, info: null })}>
                <FormBudget fill={showModalDevice.info} onSubmit={submitAdd} ></FormBudget>
            </Modal>

            <BarBanner title={{ message: "Panel Presupuestos", icon: "bi bi-calculator-fill" }} button={ActionButton} buttonback={{ action: () => router.back() }}>
                <FormFilters setValues={setFilters}></FormFilters>
            </BarBanner>

            <TableBudget elements={history} Open={OpenModal}></TableBudget>

        </div>
    )
}

export default Reparaciones