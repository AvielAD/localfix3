import styles from './styles.module.scss'
const Index = (props: Card) => {
    const { Icon, Title, Description } = props
    return (
        <>
            <div className={styles.containerCard}>
                <div className={styles.containerCardContent}>
                    <div className={styles.stylesCard}>
                        <div><h1><i className={Icon}></i></h1></div>
                        <div><h1>{Title}</h1></div>
                        <div><p>{Description}</p></div>
                    </div>
                </div>
            </div>

        </>)
}

export default Index