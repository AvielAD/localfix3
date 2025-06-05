import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GenericModel2Dto } from "@/DTOS/genericdto/generic.dto";

export async function GET() {
    let EventosView: Array<GenericModel2Dto> = []
    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Brand`, {
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