const Index = (props:{show: boolean, children: string | JSX.Element | null})=>{
    return (<>
    <div className={` ${props.show ? "d-block": "d-none"}`}>
        {props.children}
    </div>
    </>)
}

export default Index