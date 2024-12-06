import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {  ReparacionDto, ReparacionInputDto } from "@/DTOS/reparaciones/reparacion";

export async function POST(req: NextRequest) {
    let EventosView = [] as Array<ReparacionDto>
    const testcookies = cookies().get('token')
    const data:ReparacionInputDto = await req.json()
    try {
        if (testcookies)
            await fetch('https://localfixback2.localfix.mx/api/Repair/Filters', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`,
                    'Content-Type': 'application/json'
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