import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export interface CreateAccountReqType {
  session: Session;
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    organization: string;
  };
}

export default async function CreateAccount(req: NextApiRequest, res: NextApiResponse) {
  const { session, data }: CreateAccountReqType = req.body;

  const client = new PrismaClient();

  if (session) {
    const sponsor = await client.user.findFirst({}).OrganizationUsers({ where: { userId: session.user.id } });
    console.log(sponsor);
  }

  const { confirmPassword, organization, ...userToCreate } = data;
  const user = await client.user.create({ data: userToCreate });

  return res.status(200).json({ message: "Hello World" });
}
