'use client'
import Promocional from '@/Components/PromocionalLocalFix/page'
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import MenuAdd from "@/Components/AddMenu"
import ModalGeneral from '@/Components/ModalGeneral/page'
import FormDiagnostic from '@/Components/Formularios/AddDiagnosticForm/page'
import FormRepair from '@/Components/Formularios/AddReparacionForm/page'

const Dashboard = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [modalDiag, setModalDiag] = useState(false)
    const [modalRep, setModalRep] = useState(false)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (<>

        

        <ModalGeneral show={modalDiag} close={setModalDiag} >
            <FormDiagnostic show={modalDiag} close={setModalDiag} />
        </ModalGeneral>

        <ModalGeneral show={modalRep} close={setModalRep} >
            <FormRepair show={modalRep} close={setModalRep} />
        </ModalGeneral>

        <div className='d-none'>
            <Promocional ref={componentRef}></Promocional>
        </div>

        <div style={{height: '90vh'}} className='container'>
            <div className='h-100 row'>
                <div className='col-6 d-flex justify-content-center align-items-center'>

                    <button onClick={handlePrint} className='btn btn-primary'>
                        <div className='row text-center'>
                            <i style={{ fontSize: '2rem' }} className="bi bi-printer"></i>
                            <p>Promocional</p>
                        </div>
                    </button>

                </div>

                <div className='col-6 d-flex justify-content-center align-items-center'>
                    <div>
                        <button  onClick={()=>setModalDiag(true)}
                        className='btn btn-primary'>
                            <div className='row text-center'>
                                <i style={{ fontSize: '2rem' }} className='bi bi-cloud-arrow-up'></i>
                                <p>Diagnosticos</p>

                            </div>

                        </button>
                    </div>
                </div>

                <div className='col-6 d-flex justify-content-center align-items-center'>
                    <div className=''>
                        <button onClick={()=>setModalRep(true)} className='btn btn-primary'>
                            <div className='row text-center'>
                                <i style={{ fontSize: '2rem' }} className='bi bi-tools'></i>
                                <p>Reparaciones</p>

                            </div>

                        </button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Dashboard