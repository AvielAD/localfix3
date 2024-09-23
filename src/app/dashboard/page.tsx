'use client'
import Promocional from '@/Components/PromocionalLocalFix/page'
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import MenuAdd from "@/Components/AddMenu"
import ModalGeneral from '@/Components/ModalGeneral/page'
import FormDiagnostic from '@/Components/Formularios/AddDiagnosticForm/page'

const Dashboard = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [modalDiag, setModalDiag] = useState(false)
    const [modalRep, setModalRep] = useState(false)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (<>

      
    </>)
}

export default Dashboard