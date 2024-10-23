'use client'
import { useRef, useState } from 'react';

import HeaderBarNew from '@/Components/new/components/haderbar'
import ModalNew from '@/Components/new/components/modal'
import Promocional from '@/Components/PromocionalLocalFix/page'

import FormRepairNew from '@/Components/new/components/formularios/reparacion_add'
import FormDiagnosticNew from '@/Components/new/components/formularios/diagnostic_add'

import { SideBar } from '@avielad/componentspublish'
import { useReactToPrint } from 'react-to-print';


export default function Dashboard({ children, }: { children: React.ReactNode }) {
  const [showModalRepair, setShowModalRepair] = useState(false)
  const [showModalDiag, setShowModalDiag] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

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
    },
    {
      nameaction: "Imprimir Promocional",
      action: false,
      setaction: handlePrint
    }
  ]
  return (
    <div className="grid grid-cols-sidebar grid-rows-header lg:grid-cols-sidebarlx lg:grid-rows-headerlx gap-4 h-screen">
      <div className='hidden'>
        <Promocional ref={componentRef}></Promocional>
      </div>
      <ModalNew show={showModalRepair} close={() => setActionModalRepair()}>
        <FormRepairNew close={() => setActionModalRepair()}></FormRepairNew>
      </ModalNew>

      <ModalNew show={showModalDiag} close={() => setActionModalDiag()}>
        <FormDiagnosticNew close={() => setActionModalDiag()}></FormDiagnosticNew>
      </ModalNew>

      <div className="hidden lg:grid lg:row-span-2 text-center p-2">
        <SideBar routes={routes} actions={actions}></SideBar>
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