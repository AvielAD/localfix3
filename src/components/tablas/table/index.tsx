import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { AssingStateColor, ITreeStatesColors, TreeStatesColors } from "@/UtilitiesLocal/StateChange"
import { useRouter } from "next/navigation"

const Index = (props: { elements: Array<{ id: number, uuid: string, dateReception: Date, dateDelivery: Date, model: string, brand: string, state: { id: number, nombre: string } }>, urldetails: string }) => {
  const router = useRouter()
  console.log()
  return (
    <div className="h-full pb-16">
      <div className="w-full mb-8 rounded-lg shadow-xs">
        <div className="w-full">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr
                className="text-xs font-semibold tracking-wide text-left text-secondary-500 uppercase border-b dark:border-secondary-700 bg-secondary-50 dark:text-secondary-400 dark:bg-secondary-800"
              >
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha Recepcion</th>
                <th className="px-4 py-3">Fecha Entrega</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-secondary-700 dark:bg-secondary-800">
              {
                props.elements.map((item, index) => (
                  <tr key={index} onClick={() => { router.push(`${props.urldetails}${item.uuid}`) }} className="text-secondary-700 dark:text-secondary-400 cursor-pointer hover:text-theme3-100 hover:bg-theme1-600">
                    <td className="px-4 py-3">{item.brand} {item.model}</td>
                    <td className={`px-4 py-3 text-center ${AssingStateColor(item.state.nombre)}`}>{item.state.nombre}</td>
                    <td className="px-4 py-3">{FormatMedDate(item.dateReception)}</td>
                    <td className="px-4 py-3">{FormatMedDate(item.dateDelivery)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Index