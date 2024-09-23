import { DateTime } from "luxon"
import { GenericModelDto } from "../genericdto/generic.dto"

export interface ReparacionDto{
    id: number,
    uuid: string,
    dateReception: Date,
    dateDelivery: Date,
    model: string,
    brand: string,
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

}

export interface ReparacionTicket{
    costoTotal: number,
    modeloEquipo: string,
    descripcionFalla: string,
    descripcionReparacion: string,
    fechaRecepcion: string,
    fechaEntrega: string,
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

