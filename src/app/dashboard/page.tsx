'use client'
import Promocional from '@/Components/PromocionalLocalFix/page'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Dashboard = ()=>{
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (<>
        <div>
            prueba dashboard

            <p>Imprimir Promocional <i onClick={handlePrint} className="bi bi-printer"></i></p>
            <div className='d-none'>
                <Promocional ref={componentRef}></Promocional>
            </div>

        </div>
    </>)
}

export default Dashboard