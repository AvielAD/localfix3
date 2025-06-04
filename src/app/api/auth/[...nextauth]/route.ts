import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'
const instanceAxios = axios.create({
    baseURL: `${process.env.NEXT_SERVICE_AUTH_URL}`,
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
                    var responseCookies = await cookies()
                    responseCookies.set({
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