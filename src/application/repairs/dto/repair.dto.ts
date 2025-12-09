import { GenericCatalogV1Dto } from "@/domain/dto/genericv1.dto"

export interface RepairInput{
    nameClient: string,
    lastNameClient: string,
    phoneNumberClient: string,
    dateDelivery: Date,
    totalCost: number,
    failureDescription: string,
    repairDescription: string,
    idEquip: number,
    idGroupService: number,
    idParentRepair: number | null
}

export interface RepairResumeDto{
    id: number,
    uuid: string,
    dateReception: Date,
    dateDelivery: Date,
    model: string,
    brand: string,
    state: GenericCatalogV1Dto
}

export interface RepairByFilters{
    states: Array<number> | null,
    name: string | null,
    dateStart: string | null,
    dateEnd: string | null,
    typeDateSearch: number | null
}

export interface RefactionInput{
    nombre: string,
    descripcion: string,
    costBuy: number,
    costSale: number
}

export interface RefactionDto{
    name: string,
    description: string,
    observations: string,
    costSale: number
}