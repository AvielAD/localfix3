export interface DevicesDto{
    id: number,
    model: string,
    brand: string,
    company: string,
    category: string
}

export interface DevicesAssignDto{
    id: number,
    model: string,
    brand: string,
    company: string,
    category: string,
    assign: boolean,
    counter: number
}


export interface DevicesAssignInputDto{
        idEquipo: number,
        cost1: number,
        cost2: number,
        cost3: number,
        costSale: number,
        visiblePanelPublic: boolean
}

export interface DevicesAssignFormDto{
    idEquipo: string,
    cost1: string,
    cost2: string,
    cost3: string,
    costSale: string,
    visiblePanelPublic: boolean
}

export interface InfoModalDevice{
    show: boolean,
    info: DevicesAssignDto | null
}

export interface DeviceInputDto{
    idBrand: number,
    popularModel:string,
    model: string,
    idCategory: number
}

export interface DeviceInputFormDto{
    idBrand: string,
    popularModel:string,
    model: string,
    idCategory: string
}