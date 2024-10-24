import imgWhatsapp from './assets/WB.jpeg'
import Image from 'next/image'
import React from 'react'

const Index = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="w-[340pt] h-[380pt] p-8">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="font-inspiration text-5xl font-bold text-center">LocalFix</h1>
          <div className=''>
          <p>Reparación de celulares y computadoras</p>
          <p>14 sur 6715 local A. Puebla Puebla</p>
          </div>
        </div>

        <div className=''>
          <h5><i className="bi bi-browser-safari"></i> www.localfix.mx</h5>
          <h4><i className="bi bi-whatsapp"></i> 2229713533</h4>
        </div>

        <div className="w-[200pt] h-[280pt]">
            <Image src={imgWhatsapp} alt='sin imagen'></Image>
        </div>
      </div>
    </div>
  )
})
Index.displayName='PromocionalLocalFix'

export default Index
