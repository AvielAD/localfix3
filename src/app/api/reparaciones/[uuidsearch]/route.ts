import { cookies } from "next/headers";
import { ReparacionAllDto} from "@/DTOS/reparaciones/reparacion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {uuidsearch: string}}) {
    let EventosView = {} as ReparacionAllDto
    const testcookies = cookies().get('token')

    const uuidsearch = params.uuidsearch

    try {
        if (testcookies)
            await fetch(`https://localfixback2.localfix.mx/api/reparacion/${uuidsearch}`, {
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
