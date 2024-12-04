export interface TreeDto {
    name: string,
    index: number,
    value: Array<string>,
    trad: string
}
export const TreeStates: Array<TreeDto> = [
    { name: "ACCEPT", index: 1, value: ["START", "CANCEL"], trad: "ACEPTADO" },
    { name: "START", index: 2, value: ["PAUSE", "CANCEL", "DONE"], trad: "INICIADO" },
    { name: "PAUSE", index: 3, value: ["CANCEL", "DONE"], trad: "PAUSADO" },
    { name: "CANCEL", index: 4, value: ["DELIVERED"], trad: "CANCELADO" },
    { name: "DONE", index: 5, value: ["DELIVERED"], trad: "TERMINADO" },
    { name: "DELIVERED", index: 6, value: [], trad: "ENTREGADO" },
]

export interface ITreeStatesColors {
    ACCEPT: string,
    START: string,
    PAUSE: string,
    CANCEL: string,
    DONE: string,
    DELIVERED: string
}
export const TreeStatesColors: ITreeStatesColors = {
    ACCEPT:     "bg-theme1-600 text-theme1-100",
    START:      "bg-theme2-600 text-theme2-100",
    PAUSE:      "bg-theme5-600 text-theme5-100",
    CANCEL:     "bg-black text-white",
    DONE:       "bg-theme6-600 text-theme6-100",
    DELIVERED:  "bg-primary-600 text-primary-100"
}
export const AssingStateColor = (Name: string) => {
    return TreeStatesColors[Name as keyof ITreeStatesColors]
}