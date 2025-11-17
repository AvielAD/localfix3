'use client'
import { postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner } from "@avielad/componentspublish"
import { useEffect, useState } from "react"
import FormFilters from '@/components/formularios/device_public'
import CardPricing from '@/components/cards/cardpricing'
import { BudgetDto } from '@/application/budget/dtos/budget.dto'

const Reparaciones = () => {
    const [history, setHistory] = useState([] as Array<BudgetDto>)
    const [filters, setFilters] = useState({ name: "" })

    useEffect(() => {

        if (filters.name !== "") {
            postFetcher(`/api/budget/byfilters`, {title: filters.name}).then((data) => {
                setHistory(data)
            })
        }

    }, [filters])
    return (
        <div className="max-w-(--breakpoint-lg) mx-auto">
            <BarBanner title={{ message: "Panel Presupuestos", icon: "bi bi-calculator-fill" }}></BarBanner>
            <FormFilters setValues={setFilters}></FormFilters>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 '>
                {
                    history.map((item: BudgetDto, index: number) => 
                        (<CardPricing key={index} element={{
                            Title:item.equip.nombre,
                            Subtitle:item.title,
                            Subtitle2:item.groupService.nombre,
                            Description:item.description,
                            Cost:item.cost
                        }}></CardPricing>))

                }
            </div>

        </div>
    )
}

export default Reparaciones