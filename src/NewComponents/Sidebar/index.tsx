import Link from "next/link"

const Index = (props: { isSidebarOpen: boolean, items: Array<{ ruta: string, uri: string, icon: string }> }) => {
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen
            pt-20 border-r bg-gray-100
            transition-transform ${props.isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
            <div className="h-full px-3 pb-4 overflow-y-auto ">
                <ul className="space-y-2 font-medium">
                    {
                        props.items.map((item, index) => {
                            return <Link
                                key={index}
                                href={item.uri}
                                className="flex items-center hover:bg-gray-700 hover:text-white rounded-md text-xl mt-5 mb-5 duration-300"
                            > <i className={`bi bi-${item.icon} me-2 mx-2`}></i> {item.ruta}</Link>
                        })
                    }
                </ul>
            </div>

        </aside>
    )
}


export default Index
