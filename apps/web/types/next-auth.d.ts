import NextAuth, { type DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    organization: string;
  }

  interface Session {
    user: User 
  }
}

declare module "next-auth/jwt" {
  interface User {
    id: string;
  }
  interface JWT {
    uid: string;
    organization: string;
  }
}
