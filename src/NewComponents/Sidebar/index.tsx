import { SiderbarItemDto } from "./dto/sidebar.dto"

const Index =(props: {children:Array<JSX.Element> | string | null, EnterpriseName: string, show: boolean})=>{

    return (
    <aside className=" h-full bg-blue-600">
        <nav className="p-2 w-75 lg:w-100  text-center">
            <div className="text-gray-100 text-xl">
                <h1 className="text-4xl">{props.EnterpriseName}</h1>
                <ul className="px-3">
                    {props.children}
                </ul>
            </div>
        </nav>
    </aside>
    )
}

export default Index