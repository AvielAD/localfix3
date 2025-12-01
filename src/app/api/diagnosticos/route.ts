import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { response } from "@/DTOS/response/response";
import { DiagnosticInput, DiagnosticosDto, UpdateDiagnosticoInputDto } from "@/application/diagnostics/dtos/diagnostic.dto";

export async function GET() {
    let EventosView: Array<DiagnosticosDto> = []
    const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Diagnostic`, {
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
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const data:DiagnosticInput = await req.json()
    
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Diagnostic`, {
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

export async function PUT(req: NextRequest) {
    let Response = {} as response
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const data:UpdateDiagnosticoInputDto = await req.json()
    
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/diagnostico`, {
                method: "PUT",
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