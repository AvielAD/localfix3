'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "./provider";
import TopNavBar from '../../Components/TopNavBar'
import { menunav, menuoption } from '@/DTOS/menuNav/menunav';
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

const menusrutas: Array<menuoption> = [
  {
    nombreruta: "Inicio",
    urlruta: "/dashboard/"
  },
  {
    nombreruta: "Diagnosticos",
    urlruta: "/dashboard/diagnosticos"
  },
  {
    nombreruta: "Reparaciones",
    urlruta: "/dashboard/reparaciones"
  },
]



export default function Dashboard({
  children,
}: {
  children: React.ReactNode
}) {
  const [menu, setMenu] = useState(true);
  const wrapperRef = useRef(null) as any
  const logowrapRef = useRef(null) as any

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (menu && wrapperRef.current && logowrapRef.current &&
        !wrapperRef.current.contains(event.target) && !logowrapRef.current.contains(event.target)) {
        setMenu(false)
      }
    }

    document.addEventListener('click', handleOutSideClick)
    return () => {
      document.removeEventListener('click', handleOutSideClick)
    }
  })


  return (
    <div>
      <div ref={wrapperRef} className={`${styles.SideBar} ${menu ? "d-flex" : "d-none"}`}>
        <TopNavBar rutas={menusrutas} />
      </div>
      <div className={styles.ContainerLayout} >

        <div className={styles.areaTopbar}>
          <div className='container'>
            <div className='d-flex justify-content-end'>
              <i ref={logowrapRef} style={{ fontSize: '2rem' }} className="bi bi-list" onClick={() => setMenu(!menu)}></i>
            </div>
          </div>
        </div>
        <div className={styles.areaMain}>
          <Providers>{children}</Providers>
        </div>

      </div>
    </div>
  )
}
