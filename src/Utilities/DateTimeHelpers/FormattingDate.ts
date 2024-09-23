import { DateTime } from "luxon"

export const FormatMedDate = (fecha: Date) =>{
    return DateTime.fromISO(fecha.toString()).toLocaleString(DateTime.DATE_MED)    
}

