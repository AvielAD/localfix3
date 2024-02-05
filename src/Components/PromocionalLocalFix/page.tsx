import styles from './styles.module.scss'
import imgWhatsapp from './assets/WB.jpeg'
import Image from 'next/image'
import React from 'react'

const Page = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.containerContent}>
        <div>
          <h1 className={styles.mainTitle}>LocalFix</h1>
          <p>Reparacion de celulares y computadoras</p>
          <p>14 sur 6715 local A. Puebla Puebla</p>
        </div>

        <div>
          <h5><i className="bi bi-browser-safari"></i> www.localfix.mx</h5>
          <h4><i className="bi bi-whatsapp"></i> 2229713533</h4>
        </div>

        <div className={styles.containerImage}>
            <Image src={imgWhatsapp} alt='sin imagen' fill></Image>
        </div>
      </div>
    </div>
  )
})
Page.displayName='PromocionalLocalFix'

export default Page
