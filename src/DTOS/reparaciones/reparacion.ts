export interface ReparacionDto{
    uuid: string,
    recepcion: Date,
    entrega: Date,
    modelo: string,
    marca: string,
    falla: string,
    diagnostico: string
}

export interface ReparacionInputDto{
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    fechaentrega: Date,
    costototal: number,
    iddiagnostico: number
}
export interface ReparacionAllDto{
    id: number,
    uuid: string,
    nombre: string,
    apellido: string,
    telefono: string,
    recepcion: Date,
    entrega: Date,
    modelo: string,
    marca: string,
    falla: string,
    diagnostico: string,
    presupuesto: number,
    total: string
}

export interface ReparacionTicket{
    costoTotal: number,
    modeloEquipo: string,
    descripcionFalla: string,
    descripcionReparacion: string,
    fechaRecepcion: string,
    fechaEntrega: string,
    nombreCliente: string,
    telCliente: string
}

export interface ReparacionFirstDto{
    nombre: string,
    apellido: string,
    telefono: string,
    fechaentrega: Date,
    costototal: number,
    descripcionfalla:string,
    sugerenciareparacion:string,
    idequipo: number

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

}