import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { response } from "@/DTOS/response/response";

type Params = Promise<{uuidsearch: string, idstate: string}>

export async function PUT(req: NextRequest, props:{ params:Params}) {
    let Response = {} as response

    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
     const params = await props.params
    //const uuidsearch = params.uuidsearch
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Repair/${params.uuidsearch}/State/${params.idstate}`, {
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