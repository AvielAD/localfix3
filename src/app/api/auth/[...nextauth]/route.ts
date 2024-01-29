import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next"
import { cookies } from 'next/headers'
const instanceAxios = axios.create({
    baseURL: 'https://authmodule.localfix.mx',
    //baseURL: 'http://localhost:3000',
    withCredentials: true
})

const auth = NextAuth({
    providers: [

        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials as { email: "", password: "" }
                    console.log("Email: " + email + " Password: " + password)

                    const response = await instanceAxios.post('/api/authenticate', {
                        email,
                        passkey: password
                    })

                    const responseUserInfo = response.data.data
                    const user = {
                        id: "1",
                        name: String(responseUserInfo.nombre),
                        email: String(responseUserInfo.email),
                        token: String(responseUserInfo.token)
                    }
                    cookies().set({
                        name: "token",
                        value: responseUserInfo.token,
                        sameSite: "lax",
                        httpOnly: true
                    })

                    return user
                } catch (error) {
                    console.log(error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        maxAge: 4 * 60 * 60
    }
})


export { auth as GET, auth as POST }