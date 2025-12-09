import { cookies } from "next/headers";
import { ReparacionAllDto } from "@/DTOS/reparaciones/reparacion";
import { NextRequest, NextResponse } from "next/server";
import { response } from "@/DTOS/response/response";
import { RefactionDto, RefactionInput } from "@/application/repairs/dto/repair.dto";

type Params = Promise<{ uuidsearch: string }>

export async function GET(req: NextRequest, props: { params: Params }) {
    let EventosView = {} as RefactionDto[]
    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const params = await props.params
    const idRepair = params.uuidsearch
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Repair/${idRepair}/Refaccion`, {
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

export async function POST(req: NextRequest, props: { params: Params }) {
    let Response = {} as response
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const data:RefactionInput = await req.json()
    const params = await props.params
    const idRepair = params.uuidsearch
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Repair/${idRepair}/Refaccion`, {
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