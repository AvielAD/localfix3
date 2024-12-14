'use client'
import { useRef, useState } from 'react';
import Promocional from '@/components/promocionallocalfix'
import FormRepairNew from '@/components/formularios/reparacion_add'
import FormDiagnosticNew from '@/components/formularios/diagnostic_add'
import { SideBar, HeaderBar, Modal, Toast, useToast } from '@avielad/componentspublish'
import { useReactToPrint } from 'react-to-print';

export default function Dashboard({ children, }: { children: React.ReactNode }) {
  const [showModalRepair, setShowModalRepair] = useState(false)
  const [showModalDiag, setShowModalDiag] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null);
  const Toast1 = useToast();

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
      nameaction: "Reparacion",
      action: showModalRepair,
      setaction: setActionModalRepair
    },
    {
      nameaction: "Diagnostico",
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
      <Modal show={showModalRepair} close={() => setActionModalRepair()}>
        <FormRepairNew toast={Toast1.changeToast} close={() => setActionModalRepair()}></FormRepairNew>
      </Modal>

      <Modal show={showModalDiag} close={() => setActionModalDiag()}>
        <FormDiagnosticNew toast={Toast1.changeToast} close={() => setActionModalDiag()}></FormDiagnosticNew>
      </Modal>

      <Toast Show={Toast1.toast.show} ServerMessage={Toast1.toast.response}></Toast>

      <div className="hidden lg:grid lg:row-span-2 text-center p-2">
        <SideBar routes={routes} actions={actions}></SideBar>
      </div>
      <div className="">
        <HeaderBar routes={routes} actions={actions}></HeaderBar>
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
    icon: "bi bi-house-fill"
  },
  {
    route: "/dashboard/public",
    nameroute: "Panel Presupuestos",
    icon: "bi bi-calculator-fill"
  },
  {
    route: "/dashboard/diagnosticos",
    nameroute: "Diagnosticos",
    icon: "bi bi-chat-left-quote-fill"
  },
  {
    route: "/dashboard/reparaciones",
    nameroute: "Reparaciones",
    icon: "bi bi-wrench-adjustable"
  },
  {
    route: "/dashboard/reports",
    nameroute: "Reportes",
    icon: "bi bi-file-earmark-bar-graph-fill"
  },
  {
    route: "/dashboard/configuration",
    nameroute: "Configuracion",
    icon: "bi bi-gear-fill"
  },
]