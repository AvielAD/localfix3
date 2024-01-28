import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DiagnosticoInputDto, DiagnosticosDto } from "@/DTOS/diagnosticos/diagnosticos";
import { response } from "@/DTOS/response/response";

export async function GET() {
    let EventosView: Array<DiagnosticosDto> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/diagnostico', {
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
    const data:DiagnosticoInputDto = await req.json()
    
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/diagnostico', {
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