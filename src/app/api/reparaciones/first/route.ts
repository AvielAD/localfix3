import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { response } from "@/DTOS/response/response";
import { RepairInput } from "@/application/repairs/dto/repair.dto";

export async function POST(req: NextRequest) {
    let Response = {} as response
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const data:RepairInput = await req.json()
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Repair`, {
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