const Index = (props: { show: boolean, close: Function, children: string | JSX.Element | null }) => {
    return (<>
        <div className={`hs-overlay overflow-y-auto fixed inset-0 flex justify-center items-center transition-colors
        ${props.show ? "visible bg-black/20" : "invisible"} pt-36 sm:pt-20`} >
            <div className="bg-white rounded-xl p-5 transition-all w-4/5 md:w-2/5 h-auto">
                {props.children}
            </div>
        </div>
    </>)
}

export default Index