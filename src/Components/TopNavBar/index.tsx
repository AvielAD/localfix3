
'use client'
import Link from "next/link"
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from "react"
import { menunav, menuoption } from "@/DTOS/menuNav/menunav"
import { NextPage } from "next"

const Index = (props: menunav) => {
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

    return (
        <>
            <div className="bg-secondary rounded shadow h-100 w-100">
                <div className="container">
                    <h1 className="text-center">Menu</h1>
                    <hr />
                    <ul className="list-group">
                        {
                            rutas.map((item: menuoption, index: number) => {
                                return <Link className={styles.menuHover} key={index} href={item.urlruta}>{item.nombreruta}</Link>
                            })
                        }
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Index
