const Index =(props: {showSideBar: Function})=>{
    return(
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end cursor-pointer">
                    <i className="bi bi-list text-xl" onClick={()=>props.showSideBar()}></i>

                </div>
            </div>
        </div>
    </nav>)
}

export default Index