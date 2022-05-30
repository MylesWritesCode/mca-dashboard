import NextAuth, { Awaitable, IncomingRequest } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  username: string;
  password: string;
}


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Username",
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
      ): Awaitable<Omit<User, "id" | "password"> | { id?: string | undefined } | null> {
        throw new Error("Function not implemented.");
      },
    }),
  ],
});
