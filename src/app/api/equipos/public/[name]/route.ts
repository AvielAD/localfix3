import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DevicePublicDto } from "@/DTOS/equipos/devices";
type Params = Promise<{name: string}>

export async function GET(req: NextRequest, props:{ params:Params}) {
    let EventosView: Array<DevicePublicDto> = []
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const params = await props.params
    const nameDevice = params.name

    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Device/Public?name=${nameDevice}`, {
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