import { DateTime } from "luxon"

export const FormatMedDate = (fecha: Date) =>{
    return DateTime.fromISO(fecha.toString()).toLocaleString(DateTime.DATE_MED)    
}

export const FormatMedDateString=(fecha: string)=>{
    return DateTime.fromISO(fecha).toLocaleString(DateTime.DATE_MED)
}

export const DateToYMDString = (date: Date)=>{
    return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd")
}

export const DictMonths: {[key: string]: {name: string, date: Date, num: number}} = {
    January: {name: "Enero",date: new Date(DateTime.now().year, 0, 31), num: 1},
    February: {name: "Febrero",date: new Date(DateTime.now().year, 1, 28), num: 2},
    March: {name: "Marzo",date: new Date(DateTime.now().year, 2, 31), num: 3},
    April: {name: "Abril",date: new Date(DateTime.now().year, 3, 30), num: 4},
    May: {name: "Mayo",date: new Date(DateTime.now().year, 4, 31), num: 5},
    June: {name: "Junio",date: new Date(DateTime.now().year, 5, 30), num: 6},
    July: {name: "Julio",date: new Date(DateTime.now().year, 6, 31), num: 7},
    August: {name: "Agosto",date: new Date(DateTime.now().year, 7, 31), num: 8},
    September: {name: "Septiembre",date: new Date(DateTime.now().year, 8, 30), num: 9},
    October: {name: "Octubre",date: new Date(DateTime.now().year, 9, 31), num: 10},
    November: {name: "Noviembre",date: new Date(DateTime.now().year, 10, 30), num: 11},
    December: {name: "Diciembre",date: new Date(DateTime.now().year, 11, 31), num: 12},
}