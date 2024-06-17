import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { response } from "@/DTOS/response/response";
import { ReparacionDto, ReparacionInputDto } from "@/DTOS/reparaciones/reparacion";

export async function GET() {
    let EventosView: Array<ReparacionDto> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/reparacion', {
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
            return NextResponse.json([])
                
    } catch (error) {
        return NextResponse.json(EventosView)
    }
}

export async function POST(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:ReparacionInputDto = await req.json()
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/reparacion', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Response = userInfo
                }).catch((error) => {
                console.log(error)

                })
                return NextResponse.json(Response)
    } catch (error) {
        return NextResponse.json(Response)
    }
}