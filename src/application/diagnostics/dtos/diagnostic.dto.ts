export interface DiagnosticInput{
    failureDescription: string | null,
    repairDescription: string | null,
    budgetCost: number,
    idEquip: number,
    idGroupService: number
}

export interface DiagnosticosDto{
    id: number,
    nameDiagnostic: string,
    namePopular: string,
    dateDiagnostic: Date,
    failureDescription: string,
    budgetCost: number
}

export interface DiagnosticoInputDto{
    nameClient: string,
    failureDescription: string,
    repairDescription: string,
    budgetCost: number,
    idEquip: number
}

export interface DiagnosticoFormDto{
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
