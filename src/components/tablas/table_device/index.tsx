import { DevicesAssignDto } from "@/DTOS/equipos/devices"
import { useRouter } from "next/navigation"

const Index = (props: { elements: Array<DevicesAssignDto>, Open: (item:DevicesAssignDto)=>void }) => {
  const router = useRouter()

  return (
    <div className="h-full pb-16">
      <div className="w-full mb-8 rounded-lg shadow-xs">
        <div className="w-full">
          <table className="w-full whitespace-no-wrap overflow-hidden">
            <thead>
              <tr
                className="text-xs font-semibold tracking-wide text-left text-secondary-500 uppercase border-b dark:border-secondary-700 bg-secondary-50 dark:text-secondary-400 dark:bg-secondary-800"
              >
                <th className="px-4 py-3">Compañia</th>
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Modelo</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Asignado</th>
                <th className="px-4 py-3">Contador Reparaciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-secondary-700 dark:bg-secondary-800">
              {
                props.elements.map((item, index) => (
                  <tr key={index} className="text-secondary-700 dark:text-secondary-400  hover:text-theme3-100 hover:bg-theme1-600" >
                    <td className="px-4 py-3">{item.company}</td>
                    <td className="px-4 py-3">{item.brand}</td>
                    <td className="px-4 py-3 cursor-pointer">{item.model}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3 cursor-pointer" onClick={()=> props.Open(item)}>{item.assign ? <i className="bi bi-toggle-on"></i> : <i className="bi bi-toggle-off"></i>}</td>
                    <td className="px-4 py-3">{item.counter}</td>
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