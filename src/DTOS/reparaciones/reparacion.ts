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