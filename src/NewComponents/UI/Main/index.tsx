const Index = (props: {children: Array< JSX.Element | string | null> | JSX.Element | string | null})=>{
    return (
        <div className="bg-gray-100 p-4 sm:ml flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 ">
            {props.children}
        </div>
    )
}

export default Index