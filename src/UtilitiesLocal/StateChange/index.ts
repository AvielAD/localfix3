export interface TreeDto {
    name: string,
    index: number,
    value: Array<string>,
    trad: string
}
export const TreeStates: Array<TreeDto> = [
    {name: "ACCEPT", index: 1, value: ["START", "CANCEL"], trad: "ACEPTADO"},
    {name: "START", index: 2, value: ["PAUSE", "CANCEL", "DONE"], trad: "INICIADO"},
    {name: "PAUSE", index: 3, value: ["CANCEL", "DONE"], trad: "PAUSADO"},
    {name: "CANCEL", index:4, value: ["DELIVERED"], trad: "CANCELADO"},
    {name: "DONE",index:5, value: ["DELIVERED"], trad: "TERMINADO"},
    {name: "DELIVERED",index:6, value: [], trad: "ENTREGADO"},
]
