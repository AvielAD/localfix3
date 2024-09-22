const Index = (props: {children: JSX.Element | string | null})=>{
    return (
        <div className="flex-1 flex flex-col gap-5">
            {props.children}
        </div>
    )
}

export default Index