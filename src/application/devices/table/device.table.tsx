import { DevicesAssignDto, DevicesDto } from "@/DTOS/equipos/devices"
import { useRouter } from "next/navigation"

const Index = (props: { elements: Array<DevicesDto>, Open: (item: DevicesDto) => void }) => {
  const router = useRouter()

  return (
    <div className="w-full ">
      <table className="w-full">
        <thead>
          <tr
            className="text-left bg-secondary-100"
          >
            <th className="px-4 py-3">Compañia</th>
            <th className="">Marca</th>
            <th className="">Modelo</th>
            <th className="">Categoria</th>
            <th className="">Reparaciones</th>
            <th className="">Acciones</th>
          </tr>
        </thead>
        <tbody className="">
          {
            props.elements.map((item: DevicesDto, index) => (
              <tr key={index} className={`${index%2 === 1 ? 'bg-secondary-100' : 'bg-white'}`} >
                <td className="px-4 py-3">{item.company}</td>
                <td className="">{item.brand}</td>
                <td className="">{item.model}</td>
                <td className="">{item.category}</td>
                <td className="">{item.counter}</td>
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