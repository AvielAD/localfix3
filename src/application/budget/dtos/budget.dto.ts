import { GenericCatalogV1Dto } from "@/domain/dto/genericv1.dto"

export interface BudgetInput {
    idEquip: number,
    idGroupService: number,
    title: string,
    description: string,
    cost: number
}

export interface BudgetDto {
    id: number,
    equip: GenericCatalogV1Dto,
    groupService: GenericCatalogV1Dto,
    title: string,
    description: string,
    cost: number
}

export interface BudgetByFilters{
    title: string
}