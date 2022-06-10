import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (!credentials) return null;

        const user = await prisma.user.findFirst({ where: { username: credentials.username } });
        prisma.$disconnect();
        if (!user) return null;

        const isValid = await argon2.verify(user.password, credentials.password);
        if (isValid) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  theme: {
    colorScheme: "light",
    brandColor: "#0070f3",
    logo: "/logo.png",
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "auth/signout",
    // error: "/auth/error",
  },
});
