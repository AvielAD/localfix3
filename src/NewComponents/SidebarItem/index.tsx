import Link from "next/link"

const Index = (props: {ruta: string, uri: string, icon: string, active?: boolean, alert?: boolean})=> {
    return (<>
        <Link href={props.uri} className={`
            relative flex items-center py-2 px-3 my-1 
            font-medium rounded-md cursor-pointer 
            ${ props.active 
            ? "bg-gray-800 text-white" 
            : "hover:bg-white hover:text-black"}`}>
            <i className={`bi bi-${props.icon} mx-1`}></i> {props.ruta}
        </Link>
    </>)
}


export default Index