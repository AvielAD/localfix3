import { cookies } from "next/headers";
import { ReparacionAllDto } from "@/DTOS/reparaciones/reparacion";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{uuidsearch: string}>

export async function GET(req: NextRequest, props:{ params:Params}) {
    let EventosView = {} as ReparacionAllDto
    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const params = await props.params
    const uuidsearch = params.uuidsearch
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Repair/${uuidsearch}`, {
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
        if (EventosView)
            return NextResponse.json(EventosView)
        else
            return NextResponse.json({})

    } catch (error) {
        return NextResponse.json(EventosView)
    }
}

