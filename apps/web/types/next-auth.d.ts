import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
  }

  interface Organization {
    id: string;
    name: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
  
  // interface JWT {
  //   id: string;
  // }
}
