import NextAuth, { Awaitable, IncomingRequest } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: string;
  username: string;
  password: string;
}

export default NextAuth({
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
      authorize: function (
        credentials: Omit<User, "id"> | undefined,
        req: Pick<IncomingRequest, "headers" | "body" | "query" | "method">,
      ): Awaitable<
        Omit<User, "id" | "password"> | { id?: string | undefined } | null
      > {
        console.log("credentials:", credentials);

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
  },
});
