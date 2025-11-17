import { DevicePublicDto } from "@/DTOS/equipos/devices"
import { CardDto } from "../dto/card.dto"

const Index = (props: { element: CardDto }) => {
    return (
        <div className="w-full max-w-sm p-4 bg-white border border-secondary-200 rounded-lg shadow-lg sm:p-8">
            <h5 className="mb-4 text-xl font-medium text-secondary-800 "> {props.element.Title}</h5>
            <div className="">
                <span className="text-5xl font-extrabold tracking-tight">{props.element.Subtitle}</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
                <li className="flex items-center">
                    <i className="bi bi-check-circle-fill"></i>
                    <span className="text-base font-normal leading-tight text-secondary-500 ms-3"> Precio $ {props.element.Cost} mxn</span>
                </li>

            </ul>
            <div>
                <span className="text-xs text-justify ms-3">{props.element.Description} </span>

            </div>
        </div>
    )
}


export default Index
