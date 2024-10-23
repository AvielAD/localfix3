import { useRouter } from "next/navigation"

const Index = (props: { elements: Array<{ id: number, nameDiagnostic: string, namePopular: string, failureDescription: string }> }) => {
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
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Detalle</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-secondary-700 dark:bg-secondary-800">
              {
                props.elements.map((item, index) => (
                  <tr key={index} className="text-secondary-700 dark:text-secondary-400 cursor-pointer hover:text-theme3-100 hover:bg-theme1-600">
                    <td className="px-4 py-3">{item.nameDiagnostic}</td>
                    <td className="px-4 py-3">{item.namePopular}</td>
                    <td className="px-4 py-3">{item.failureDescription}</td>
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