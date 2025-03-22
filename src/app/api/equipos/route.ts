import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DeviceInputDto, DevicesDto } from "@/DTOS/equipos/devices";
import { response } from "@/DTOS/response/response";

export async function GET() {
    let EventosView: Array<DevicesDto> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Device`, {
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

                return NextResponse.json(EventosView)
    } catch (error) {
        return NextResponse.json(EventosView)
    }
}


export async function POST(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:DeviceInputDto = await req.json()
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/Device', {
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