import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DevicePublicDto } from "@/DTOS/equipos/devices";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    let EventosView: Array<DevicePublicDto> = []
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
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