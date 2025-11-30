import { CardDto } from "../dto/card.dto"

const Index = (props: { element: CardDto, consult: ()=>void, repair: ()=>void }) => {
    return (
        <div className="h-[20rem] border border-secondary-300 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 grid-rows-4 h-full p-4">
                <div className="">
                    <h5 className="text-xl text-left"> {props.element.Title}</h5>
                </div>
                <div className="">
                    <span className="font-bold">{props.element.Subtitle}</span>
                    <div>
                        <i className="bi bi-check-circle-fill"></i>
                        <span className=""> Precio: $ {props.element.Cost} mxn</span>
                    </div>
                </div>
                <div className="">
                    <span className="">{props.element.Description} </span>
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                    <button type="button" onClick={()=>props.consult()} className="rounded-xl bg-secondary-200 text-secondary-500 hover:bg-secondary-500 hover:text-white p-1">Consulta</button>
                    <button type="button" onClick={()=>props.repair()} className="rounded-xl bg-warning-200 text-warning-500 hover:bg-warning-500 hover:text-white p-1">Reparacion</button>

                </div>

            </div>
        </div>
    )
}


export default Index
