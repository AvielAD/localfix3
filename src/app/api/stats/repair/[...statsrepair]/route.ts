import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GroupStats } from "@/application/stats/dto/diagnosticstats.dto";

type Params = Promise<{statsrepair: Array<string>}>


export async function GET(req: NextRequest, props:{ params:Params}) {
    let EventosView: Array<GroupStats> = [] 
    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const ParamsStats = (await props.params).statsrepair
    const Year = parseInt(ParamsStats[0])
    const Month = parseInt(ParamsStats[1] ?? 0)
    const WithRepair = ParamsStats[2] === "true"
    
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Stats/Repair/${Year}/${Month}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    EventosView = userInfo
                }).catch((error) => {
                })
        if(EventosView)
            return NextResponse.json(EventosView)
        else
            return NextResponse.json({})
                
    } catch (error) {
        return NextResponse.json(EventosView)
    }
}