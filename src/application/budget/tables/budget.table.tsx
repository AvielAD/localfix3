import { useRouter } from "next/navigation"
import { BudgetDto } from "../dtos/budget.dto"

const Index = (props: { elements: Array<BudgetDto>, Open: (item: BudgetDto) => void }) => {
  const router = useRouter()

  return (
    <div className="w-full ">
      <table className="w-full">
        <thead>
          <tr
            className="text-left bg-secondary-100"
          >
            <th className="px-4 py-3">Modelo</th>
            <th className="">Servicio</th>
            <th className="">Costo</th>
            <th className="">Grupo</th>
            <th className="">Acciones</th>
          </tr>
        </thead>
        <tbody className="">
          {
            props.elements.map((item: BudgetDto, index) => (
              <tr key={index} className={`${index%2 === 1 ? 'bg-secondary-100' : 'bg-white'}`} >
                <td className="px-4 py-3">{item.equip.nombre}</td>
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3">{item.cost}</td>
                <td className="px-4 py-3">{item.groupService.nombre}</td>
                <td className=""><button onClick={()=>props.Open(item)} className="text-primary-500">Editar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Index