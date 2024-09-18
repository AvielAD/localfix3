import styles from './styles/style.module.scss'

const Index = (props: { show: boolean, succedded: boolean, children: string | JSX.Element | null }) => {
    return (<>
        <div className={` ${props.show ? "visibility: visible" : "visibility: hidden"} ${props.succedded ? "bg-green-500" : "bg-rose-600"} object-none object-right-bottom text-white `}>
            <div className="bg-green-500">
                {props.children}
            </div>
        </div>
    </>)
}

export default Index