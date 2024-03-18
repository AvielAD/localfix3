export interface DiagnosticosDto{
    id: number,
    nombre: string,
    modelopopular: string,
    fecha: Date,
    descripcionfalla: string,
    costopresupuesto: number
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

export interface UpdateDiagnosticoInputDto{
    iddiagnostico: number
    descripcionfalla: string,
    sugerenciareparacion: string,
}
