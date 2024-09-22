const Index = (props:{show: boolean, close: Function, children: string | JSX.Element | null})=>{
    return (<>
    <div className={`fixed inset-0 flex justify-center items-center transition-colors
        ${props.show ? "visible bg-black/20" : "invisible"}`}>
            <div className="bg-white rounded-xl p-5 transition-all ">
            {props.children}
            </div>
    </div>
    </>)
}

export default Index