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

        const user = await prisma.user.findFirst({
          where: { OR: [{ username: credentials.username }, { email: credentials.username }] },
          include: { OrganizationUsers: { include: { organizations: true } } },
        });
        prisma.$disconnect();
        if (!user) return null;

        const isValid = await argon2.verify(user.password, credentials.password);
        const res = isValid
          ? {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              organization: user.OrganizationUsers[0].organizations.name,
            }
          : null;

        return res;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.organization = user.organization;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      if (token.sub && token.organization) {
        session.user.id = token.sub;
        session.user.organization = token.organization;
      }

      return Promise.resolve(session);
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  session: {
    strategy: "jwt",
  },
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
