import { cookies } from "next/headers";
import { ReparacionAllDto } from "@/DTOS/reparaciones/reparacion";
import { NextRequest, NextResponse } from "next/server";
import { response } from "@/DTOS/response/response";

export async function GET(req: NextRequest, { params }: { params: { uuidsearch: Array<string> } }) {
    let EventosView = {} as ReparacionAllDto
    const testcookies = cookies().get('token')

    const uuidsearch = params.uuidsearch

    try {
        if (testcookies)
            await fetch(`https://localfixback2.localfix.mx/api/Repair/${uuidsearch[0]}`, {
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

export async function PUT(req: NextRequest, { params }: { params: { uuidsearch: Array<string> } }) {
    let Response = {} as response

    const testcookies = cookies().get('token')

    const uuidsearch = params.uuidsearch
    try {
        if (testcookies)
            await fetch(`https://localfixback2.localfix.mx/api/Repair/${uuidsearch[0]}/State/${uuidsearch[1]}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Response = userInfo
                }).catch((error) => {
                })
        if (Response)
            return NextResponse.json(Response)
        else
            return NextResponse.json({})

    } catch (error) {
        return NextResponse.json(Response)
    }
}