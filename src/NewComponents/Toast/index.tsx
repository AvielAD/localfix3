
const Index = (props: {Show: boolean, ServerMessage: {Succedded: boolean, Message: string}}) => {
    //${props.Show ? "visible": "invisible"}
    return (
    <div className={`${props.Show ? "visible": "invisible"} 
    z-40 absolute right-4 text-xs sm:text-base sm:right-24 md:right-56 lg:right-[350px] 
    bg-${props.ServerMessage.Succedded ? "green" : "red"}-100 text-${props.ServerMessage.Succedded ? "green" : "red"}-700 rounded-lg border-${props.ServerMessage.Succedded ? "green" : "red"}-200 
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