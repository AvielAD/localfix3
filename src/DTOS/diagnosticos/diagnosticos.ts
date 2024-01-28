export interface DiagnosticosDto{
    fecha: Date
    cliente: string,
    descripcionfalla: string,
    sugerenciareparacion: string,
    costopresupuesto: number,
    idequipo: number
}

export interface DiagnosticoInputDto{
    cliente: string,
    descripcionfalla: string,
    sugerenciareparacion: string,
    costopresupuesto: number,
    idequipo: number
}

export interface DiagnosticoFormDto{
    cliente: string,
    descripcionfalla: string,
    sugerenciareparacion: string,
    costopresupuesto: string,
    idequipo: string
}