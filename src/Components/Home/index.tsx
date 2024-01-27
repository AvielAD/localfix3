import styles from './styles.module.scss'

const Index = () => {
    return (
        <>
            <div className={styles.containerHome}>
                <div className={styles.containerContentHome}>
                    <div className={styles.containerBanner}>
                        <div className={styles.bannerHome}>
                            <div><h1>Atmosfera</h1></div>
                            <div><p>Aprendizaje para toda la vida, mejora tus habilidades en tecnología con un enfoque académico exclusivo y diferente
                                , emprende tu propia startup o multiplica tus ingresos entrando al sector más demandado de la década.</p></div>
                            <div ><p className={styles.buttonHome}>Oferta Academica</p></div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Index;