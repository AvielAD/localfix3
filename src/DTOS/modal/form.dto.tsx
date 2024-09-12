import { response } from "../response/response"

export interface dataFormsModalDto{
    showModal: boolean,
    close: Function,
    children: string | JSX.Element | null,
}

export interface addDatadto{
    showModal: boolean,
    triggerToast: boolean
    serverresponse: response
}

export interface addDataPropsFormDto{
    dataform: addDatadto,
    close: Function,
}

export interface addDataPropsCompraFormDto{
    dataform: addDatadto,
    close: Function,
    IdCompra: number
}
