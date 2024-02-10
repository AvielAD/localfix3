'use client'
import Promocional from '@/Components/PromocionalLocalFix/page'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import MenuAdd from "@/Components/AddMenu"

const Dashboard = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (<>
        <div>
            prueba dashboard

            <div className='row'>
                <div className='col'>
                    <p className='d-flex justify-content-center'>
                        <i onClick={handlePrint} className="display-2 bi bi-printer">
                            </i></p>
                </div>
            </div>

            <div className='d-none'>
                <Promocional ref={componentRef}></Promocional>
            </div>

            <div className='row'>
                <div className='col'>
                    <div className='d-flex justify-content-center'>
                        <div>
                            <MenuAdd url='/dashboard/diagnosticos/Add'></MenuAdd>
                            <p>Diagnosticos</p>
                        </div>
                    </div>
                </div>

                <div className='col'>
                    <div className='d-flex justify-content-center'>
                        <div>
                            <MenuAdd url='/dashboard/reparaciones/first'></MenuAdd>
                            <p>Reparaciones</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Dashboard