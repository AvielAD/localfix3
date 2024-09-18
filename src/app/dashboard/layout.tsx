'use client'
import { Providers } from "./provider";
import { useState } from 'react';
import Sidebar from '@/NewComponents/Sidebar'
import SidebarItem from '@/NewComponents/SidebarItem'
import useSWR from 'swr';


const menusrutas =
  [
    {
      ruta: "Inicio",
      uri: "/dashboard/",
      icon: "speedometer2",
      active: true
    },
    {
      ruta: "Diagnosticos",
      uri: "/dashboard/diagnosticos",
      icon: "clipboard-check"

    },
    {
      ruta: "Reparaciones",
      uri: "/dashboard/reparaciones",
      icon: "wrench-adjustable"

    },
    {
      ruta: "Configuration",
      uri: "/dashboard/configuration",
      icon: "gear-wide-connected"
    }
  ]

export default function Dashboard({ children, }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);

  return (
    <div className="h-screen">
      <div className="h-full">

        <div className={`text-2xl ${menu ? "hidden" : "flex"}`}>
          <i className="bi bi-list" onClick={()=>setMenu(!menu)}></i>
        </div>

        <div className={` ${menu ? "flex" : "hidden"} `}>
          <Sidebar EnterpriseName={"Menu"} show={menu}>
            {
              menusrutas.map((item, index) => {
                return <SidebarItem key={index} ruta={item.ruta} uri={item.uri} icon={item.icon} active={item.active}></SidebarItem>
              })
            }
          </Sidebar>
        </div> 

        <div className="">
          <Providers>{children}</Providers>
        </div>
      </div>
    </div>
  )
}
