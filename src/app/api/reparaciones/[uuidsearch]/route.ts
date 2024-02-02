import { cookies } from "next/headers";
import { ReparacionAllDto} from "@/DTOS/reparaciones/reparacion";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    let EventosView = {} as ReparacionAllDto
    const testcookies = cookies().get('token')
    const {uuidsearch} = req.query
    try {
        if (testcookies)
            await fetch(`https://localfixback2.localfix.mx/api/reparacion/${uuidsearch}`, {
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
            return res.json(EventosView)
        else
            return res.json({})
                
    } catch (error) {
        return res.json(EventosView)
    }
}
