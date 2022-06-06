import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  username: string;
  password: string;
}

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const user = await prisma.user.findUnique({

        });

        try {

        } catch (e) {
          // handle the error lol
          console.warn(e);
          return null;
        }

        return null;
      },
    }),
  ],
  jwt: {},
  theme: {
    colorScheme: "light",
    brandColor: "#0070f3",
    logo: "/logo.png",
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "auth/signout",
  },
});
