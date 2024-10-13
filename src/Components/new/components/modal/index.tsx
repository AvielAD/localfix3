const Index = (props: { close: Function,show: boolean, children: string | JSX.Element | null}) => {
    
    return (
        <div
        onClick={()=>props.close()} 
        className={`${props.show ? "fixed":"hidden"} inset-0 z-30 flex bg-black bg-opacity-50 items-center justify-center`}>
            <div 
            onClick={(e: any)=> e.stopPropagation()}
            className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-secondary-800 rounded-lg m-4 max-w-xl">
                <div className="">
                    {props.children}
                </div>

            </div>

        </div>
    )
}
export default Index