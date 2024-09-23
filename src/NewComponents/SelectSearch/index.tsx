'use client'
import { DevicesDto } from "@/DTOS/equipos/devices"
import { fetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { FieldProps } from "formik"
import { useState } from "react"
import useSWR from "swr"

const Index = ({ field, form, ...props }: FieldProps) => {
    const [dataValue, setDataValue] = useState("")
    const dataEquipos = useSWR('/api/equipos/popular', fetcher)

    if (!dataEquipos.data) return <div>Loading</div>

    const ChangeInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const EquipoId = e.currentTarget.getAttribute('data-value')
        const valor = e.target.value
        console.log(EquipoId)
        console.log(valor)
        //setDataValue(valor)
    }

    return (
        <div>
            <input type="search" list="list" autoComplete="on" id="" {...field} {...props} value={dataValue} onChange={(e)=>ChangeInput(e)}
                className={`ring-1 w-3/4 sm:w-full rounded-md outline-none focus:ring-2 focus:ring-blue-600 `}
            />
            <datalist id="list">
                {
                    dataEquipos.data?.map((item: DevicesDto, index: number) => {
                        return <option key={index} data-value={item.id} value={item.model}>{item.company} {item.brand} {item.model}</option>
                    })
                }
            </datalist>

        </div>
    )
}
export default Index