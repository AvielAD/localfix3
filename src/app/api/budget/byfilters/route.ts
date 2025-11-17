import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { response } from "@/DTOS/response/response";
import { BudgetByFilters } from "@/application/budget/dtos/budget.dto";

export async function POST(req: NextRequest) {
    let Response = {} as response
     const cookieStore = await cookies()
    const testcookies = cookieStore.get('token')
    const data:BudgetByFilters = await req.json()
    try {
        if (testcookies)
            await fetch(`${process.env.NEXT_SERVICE_BACK_URL}/api/Budget/ByFilters`, {
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