import { BarBanner } from "@avielad/componentspublish"
import Link from "next/link"

const Page = () => {

    return (<div className="w-5/6 mx-auto">
        <BarBanner button={null} title={{ message: "Configuración", icon: "bi bi-person-gear" }}></BarBanner>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-20">
            <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                <Link href={'/dashboard/configuration/devices'}>
                    <div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
                        <i className="bi bi-building text-3xl"></i>
                    </div>
                    <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Dispositivos</h1>
                    <p className="px-4 text-gray-500">Agregar Dispositivo a catalogo</p>
                </Link>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                <Link href={'/dashboard/configuration/budget/edit'}>
                    <div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
                        <i className="bi bi-heart-pulse-fill text-3xl"></i>
                    </div>
                    <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Presupuesto</h1>
                    <p className="px-4 text-gray-500">Agregar presupuesto a dispositivo que ya tiene seguimiento en estadisticas</p>
                </Link>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                <Link href={'/dashboard/configuration/profit'}>
                    <div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
                        <i className="bi bi-heart-pulse-fill text-3xl"></i>
                    </div>
                    <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Contable Stats</h1>
                    <p className="px-4 text-gray-500">Calculo normal reparaciones - piezas</p>
                </Link>
            </div>
        </div>

    </div>)
}
export default Page