
export interface DevicesDto {
    id: number,
    popularModel: string,
    technicalModel: string,
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

export interface DeviceInputDto {
    idBrand: number,
    popularModel: string,
    model: string,
    idCategory: number
}
export interface DeviceUpdateInputDto{
    id: number,
    popularModel: string,
    technicalModel: string,
}