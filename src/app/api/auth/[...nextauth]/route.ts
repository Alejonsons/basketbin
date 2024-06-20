import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { Adapter } from "next-auth/adapters";

export const authOptions = NextAuth({
    providers: [
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            }
        )
    ],
    secret: process.env.NEXTAUTH_SECRET as string
})

export { authOptions as GET, authOptions as POST }