'use client'
import { useState } from 'react';

import SideBarNew from '@/Components/new/components/sidebar'
import HeaderBarNew from '@/Components/new/components/haderbar'
import ModalNew from '@/Components/new/components/modal'

import FormRepairNew from '@/Components/new/components/formularios/reparacion_add'

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
  const [showModalRepair, setShowModalRepair] = useState(false)
  const [showModalDiag, setShowModalDiag] = useState(false)


  const setActionModalRepair = async () => {
    setShowModalRepair(!showModalRepair)
  }

  const setActionModalDiag = async () => {
    setShowModalDiag(!showModalDiag)
  }
  const actions = [
    {
      nameaction: "Agregar Reparacion",
      action: showModalRepair,
      setaction: setActionModalRepair
    },
    {
      nameaction: "Agregar Diagnostico",
      action: showModalDiag,
      setaction: setActionModalDiag
    }
  ]
  return (
    <div className="grid grid-cols-sidebar grid-rows-header lg:grid-cols-sidebarlx lg:grid-rows-headerlx gap-4 h-screen">
      <ModalNew show={showModalRepair} close={() => setActionModalRepair()}>
        <FormRepairNew close={() => setActionModalRepair()}></FormRepairNew>
      </ModalNew>

      <ModalNew show={showModalDiag} close={() => setActionModalDiag()}>
        Formulario Diagonsticos
      </ModalNew>
      <div className="hidden lg:grid lg:row-span-2 text-center p-2">
        <SideBarNew routes={routes} actions={actions}></SideBarNew>
      </div>
      <div className="">
        <HeaderBarNew routes={routes} actions={actions}></HeaderBarNew>
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}


const routes = [
  {
    route: "/dashboard",
    nameroute: "Dashboard",
    icon: "bi bi-house"
  },
  {
    route: "/dashboard/diagnosticos",
    nameroute: "Diagnosticos",
    icon: "bi bi-wrench-adjustable"
  },
  {
    route: "/dashboard/reparaciones",
    nameroute: "Reparaciones",
    icon: "bi bi-chat-left-quote"
  },
  {
    route: "/dashboard/Reportes",
    nameroute: "Reportes",
    icon: "bi bi-file-earmark-bar-graph-fill"
  },
]