'use client'
import Promocional from '@/Components/PromocionalLocalFix/page'
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const Dashboard = () => {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (<>
        <div className='hidden'>
            <Promocional ref={componentRef}></Promocional>
        </div>
        <div className='flex justify-center w-full'>
            <button onClick={handlePrint} className='inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>Imprimir Promocional <i className="ml-2 bi bi-printer"></i></button>
        </div>
    </>)
}

export default Dashboard