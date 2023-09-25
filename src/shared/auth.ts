import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
  
    providers: [
        GoogleProvider({
            clientId: process.env.GCP_CLIENT_ID,
            clientSecret: process.env.GCP_CLIENT_SECRET,
        }),
    ],
};