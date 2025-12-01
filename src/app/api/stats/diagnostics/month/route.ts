import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DiagnosticStats } from "@/application/stats/dto/diagnosticstats.dto";

export async function GET() {
    let EventosView: Array<DiagnosticStats> = [] 
    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Stats/Diagnostics?year=${(new Date()).getFullYear()}&month=${(new Date()).getMonth() + 1}`, {
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

