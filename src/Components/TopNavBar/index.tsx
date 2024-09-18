
'use client'
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { menunav, menuoption } from "@/DTOS/menuNav/menunav"
import useSWR from "swr"
import { empresadto } from "@/DTOS/empresa/empresa.dto"
const fetcher = (url: string) => fetch(url).then(r => r.json())

const Index = (props: menunav) => {
    const empresaData = useSWR(`/api/empresa`, fetcher)
    let empresaInfo = {} as empresadto

    const { rutas } = props
    const [menu, setMenu] = useState(false);
    const wrapperRef = useRef(null) as any
    const logowrapRef = useRef(null) as any

    useEffect(() => {
        const handleOutSideClick = (event: any) => {
            if (menu && wrapperRef.current && logowrapRef.current &&
                !wrapperRef.current.contains(event.target) && !logowrapRef.current.contains(event.target)) {
                setMenu(false)
                console.log('Click')
            }
        }

        document.addEventListener('click', handleOutSideClick)
        return () => {
            document.removeEventListener('click', handleOutSideClick)
        }
    })
    if (empresaData.data) empresaInfo = empresaData.data

    return (
        <>
            <div className={`rounded shadow h-100 w-100`}>
                <div className="container">
                    <h1 className="text-center">{empresaInfo.nombre ? empresaInfo.nombre : "Menu"}</h1>
                    <hr />
                    <ul className="list-group">
                        {
                            rutas.map((item: menuoption, index: number) => {
                                return <Link className="" key={index} href={item.urlruta}>{item.nombreruta}</Link>
                            })
                        }
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Index
