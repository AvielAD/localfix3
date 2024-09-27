
const Index = (props: {Show: boolean, ServerMessage: {Succedded: boolean, Message: string}}) => {
    //${props.Show ? "visible": "invisible"}
    return (
    <div className={`${props.Show ? "visible": "invisible"} 
    z-40 absolute right-4 text-xs sm:text-base sm:right-24 md:right-56 lg:right-[350px] 
    ${props.ServerMessage.Succedded ? "bg-green-100" : "bg-red-100"} 
    ${props.ServerMessage.Succedded ? "text-green-700" : "text-red-700"} rounded-lg 
    ${props.ServerMessage.Succedded ? "border-green-200" : "border-red-200"} 
    px-4 py-3`}>
        <div>
            <div className=''>
                <div className=''>
                    <p>{props.ServerMessage.Message}</p>
                </div>
            </div>
        </div>
    </div>
    )
}


export default Index