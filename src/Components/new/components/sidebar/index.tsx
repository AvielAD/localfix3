import Link from "next/link"
import { useState } from "react"

const Index = (props: { routes: Array<{ route: string, nameroute: string, icon: string }>, actions: Array<{ nameaction: string, action: boolean, setaction: Function }> }) => {
    const [show, setShow] = useState({ toglemenu: false, notimenu: false, profilemenu: false })

    const closeMenus = ()=>{
        setShow({ toglemenu: false, notimenu: false, profilemenu: false })
    }

    return (
        <div className="bg-secondary-50 dark:bg-secondary-900" onClick={()=> closeMenus()}>
            <aside className="bg-white dark:bg-secondary-800 " onClick={(e)=> e.stopPropagation()}>
                <div className="py-4 text-secondary-500 dark:text-secondary-400">
                    <a className="ml-6 text-lg font-bold text-secondary-800 dark:text-secondary-200" href="">Empresa</a>
                    <ul className="mt-6">
                        {
                            props.routes.map((item, index) => (
                                <li key={index} className="px-6 py-3">
                                    <Link
                                        className="inline-flex items-center w-full text-sm font-semibold text-secondary-800 transition-colors duration-150 hover:text-secondary-800 dark:hover:text-secondary-200 dark:text-secondary-100"
                                        href={item.route}
                                    >
                                        <i className={`${item.icon} text-lg`}></i>
                                        <span className="ml-4">{item.nameroute}</span>
                                    </Link>
                                </li>
                            ))

                        }
                    </ul>
                    {
                        props.actions.map((item, index) => (
                            <div key={index} className="px-6 my-6">
                                <button onClick={() => item.setaction()} className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-theme3-600 border border-transparent rounded-lg active:bg-theme3-600 hover:bg-theme3-700 focus:outline-none focus:shadow-outline-theme3">
                                    {item.nameaction} <span><i className="bi bi-plus-square"></i></span>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </aside>

        </div>
    )
}

export default Index