'use client'
import { BudgetInput } from '@/application/budget/dtos/budget.dto'
import FormDeviceAdd from '@/application/budget/forms/budget.form'
import { postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner, Toast, useToast } from '@avielad/componentspublish'
import { useRouter } from 'next/navigation'

const Page = () => {
    const toast = useToast()
    const router = useRouter()

    const SubmitValues = (values: BudgetInput) => {
        postFetcher('/api/budget', values).then((data)=>{
            if (data.succeeded) { 
                const timerToast = setInterval(() => {
                    router.back()
                    clearInterval(timerToast)
                }, 1000);
            }
            toast.changeToast({ Message: data.message, Succedded: data.succeeded })
        })
    }
    return (<>
        <div className="max-w-(--breakpoint-xl) mx-auto">
            <Toast Show={toast.toast.show} ServerMessage={toast.toast.response}></Toast>
            <BarBanner title={{ message: "Nuevo Presupuesto", icon: "bi bi-calculator-fill" }}></BarBanner>
            <FormDeviceAdd onSubmit={SubmitValues}></FormDeviceAdd>
        </div>
    </>)
}

export default Page