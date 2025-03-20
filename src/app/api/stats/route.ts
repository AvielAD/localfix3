import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { StatsGeneral } from "@/DTOS/stats/stats.dto";

export async function GET() {
    let EventosView = {} as StatsGeneral
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/StatsGeneral`, {
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

