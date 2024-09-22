'use client'
import { Providers } from "./provider";
import { useState } from 'react';
import HeaderPersonal from '@/NewComponents/Header'
import SidebarPersonal from '@/NewComponents/Sidebar'
import MainPersonal from '@/NewComponents/UI/Main'
import ContentPersonal from '@/NewComponents/UI/Content'
import Profile from '@/NewComponents/UI/Profile'
const menusrutas =
  [
    {
      ruta: "Inicio",
      uri: "/dashboard/",
      icon: "speedometer2",
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

  const showMenu = () => {
    setMenu(!menu)
  }
  return (
    <div className="">
      <HeaderPersonal showSideBar={showMenu} ></HeaderPersonal>
      <SidebarPersonal isSidebarOpen={menu} items={[...menusrutas]}></SidebarPersonal>

      <MainPersonal>
        <ContentPersonal>
          <Providers>{children}</Providers>
        </ContentPersonal>
      </MainPersonal>
    </div>
  )
}
