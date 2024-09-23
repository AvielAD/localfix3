import { DateTime } from "luxon"

export const FormatMedDate = (fecha: Date) =>{
    return DateTime.fromISO(fecha.toString()).toLocaleString(DateTime.DATE_MED)    
}

export const FormatMedDateString=(fecha: string)=>{
    return DateTime.fromISO(fecha).toLocaleString(DateTime.DATE_MED)
}

