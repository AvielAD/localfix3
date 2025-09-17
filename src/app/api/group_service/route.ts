import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GroupServiceDto } from "../../../application/groupservice/dto/groupservice.dto";

export async function GET() {
    let EventosView: Array<GroupServiceDto> = []
    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/GroupService`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    EventosView = userInfo
                    console.log(EventosView)
                })

                return NextResponse.json(EventosView)
    } catch (error) {
        return NextResponse.json(error)
    }
}