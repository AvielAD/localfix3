import { GenericModel2Dto, GenericModelDto } from "../genericdto/generic.dto"

export interface InputFill{
    idEquip: number,
    nameEquip: string,
    idDiagnostic: number,
    nameDiagnostic: string,
    totalCost: number,
    failureDescription: string,
    repairDescription: string,
    
}

export interface ReparacionDto{
    id: number,
    uuid: string,
    dateReception: Date,
    dateDelivery: Date,
    model: string,
    brand: string,
    state: GenericModel2Dto
}

export interface ReparacionInputDto{
    nameClient: string,
    lastNameClient: string,
    phoneNumberClient: string,
    emailClient: string,
    dateDelivery: Date,
    totalCost: number,
    idDiagnostic: number
}
export interface ReparacionAllDto{
    id: number,
    uuid: string,
    nameClient: string,
    lastNameClient: string,
    phoneNumberClient: string,
    dateReception: Date,
    dateDelivery: Date,
    model: string,
    brand: string,
    failureDevice: string,
    diagnosticDevice: string,
    budget: number,
    total: string,
    idEnterprise: number,
    estado: EstadoDto
}

export interface EstadoDto{
    id: number,
    nombre: string
}
export interface ReparacionTicket{
    costoTotal: number,
    modeloEquipo: string,
    descripcionFalla: string,
    descripcionReparacion: string,
    fechaRecepcion: Date,
    fechaEntrega: Date,
    nombreCliente: string,
    telCliente: string,
    nombreEmpresa: string,
    descripcionEmpresa: string,
    direccionEmpresa: string,
    telefonoEmpresa: string,
    webEmpresa: string
}

export interface ReparacionFirstDto{
    nameClient: string,
    lastNameClient: string,
    phoneNumberClient: string,
    dateDelivery: string,
    totalCost: number,
    failureDescription:string,
    repairDescription:string,
    idEquip: number

}

export interface ReparacionFirstInputDto{
    nombre: string,
    apellido: string,
    telefono: string,
    fechaentrega: string,
    costototal: string,
    descripcionfalla:string,
    sugerenciareparacion:string,
    idequipo: string
    estado: GenericModelDto
}

export interface ReparacionInputByFilters{
    idState: number,
    name: string,
    dateStart: string | null,
    dateEnd: string | null,
    typeDateSearch: number
}

export interface ReparacionInputByFiltersForm{
    idState: string,
    name: string,
    dateStart: string,
    dateEnd: string,
    typeDateSearch: string
}