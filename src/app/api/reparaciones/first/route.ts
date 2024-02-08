import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DiagnosticoInputDto, DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos";
import { response } from "@/DTOS/response/response";
import { ReparacionDto, ReparacionFirstDto, ReparacionInputDto } from "@/DTOS/reparaciones/reparacion";

export async function POST(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:ReparacionFirstDto = await req.json()
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/reparacion/first', {
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