import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { empresadto } from "@/DTOS/empresa/empresa.dto";

export async function GET() {
    let EventosView = {} as empresadto
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/empresa/info', {
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