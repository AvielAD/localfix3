import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DiagnosticoInputDto, DiagnosticosDto } from "@/components/formularios/diagnostic_add/dtos/diagnosticos";
import { response } from "@/DTOS/response/response";
import { ReparacionDto, ReparacionFirstDto, ReparacionInputDto } from "@/DTOS/reparaciones/reparacion";

export async function POST(req: NextRequest) {
    let Response = {} as response
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const data:ReparacionFirstDto = await req.json()
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Repair/First`, {
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
                })
                return NextResponse.json(Response)
    } catch (error) {
        return NextResponse.json(Response)
    }
}