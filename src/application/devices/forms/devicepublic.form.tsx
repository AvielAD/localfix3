'use client'
import { useForm } from "react-hook-form";

const Add = (params: { setValues: (params: { name: string }) => void }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const submitAdd = async (values: any) => {

        params.setValues(values)
    }
    return (
        <form className="p-2"
            onSubmit={handleSubmit(submitAdd)}
        >

            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bi bi-search"></i>
                </div>
                <input type="text" {...register("name")} className="block w-full p-3 ps-9 text-heading text-sm " placeholder="Search" />
                <button type="submit" className="absolute end-1.5 bottom-1.5 bg-primary-500 text-white hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-md font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
            </div>

        </form>)
}

export default Add

