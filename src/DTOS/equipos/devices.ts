export interface DevicesDto {
    id: number,
    model: string,
    brand: string,
    company: string,
    category: string,
    counter: number
}

export interface DevicesAssignDto {
    id: number,
    model: string,
    brand: string,
    company: string,
    category: string,
    assign: boolean,
    counter: number
}


export interface DevicesAssignInputDto {
    idEquipo: number,
}

export interface DevicesAssignFormDto {
    idEquipo: string,
}

export interface InfoModalDevice {
    show: boolean,
    info: DevicesAssignDto | null
}

export interface DeviceInputDto {
    idBrand: number,
    popularModel: string,
    model: string,
    idCategory: number
}

export interface DeviceInputFormDto {
    idBrand: string,
    popularModel: string,
    model: string,
    idCategory: string
}

export interface DevicePublicDto {
    id: number,
    brand: string,
    model: string,
    price: number,
    price2: number,
    price3: number,
    price4: number,
    description: string | null
}