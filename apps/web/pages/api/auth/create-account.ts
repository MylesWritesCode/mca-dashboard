import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
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

const client = new PrismaClient();

export default async function CreateAccount(req: NextApiRequest, res: NextApiResponse) {
  const { session, data }: CreateAccountReqType = req.body;
  const { organization: orgName, ...rest } = data;

  if (session) {
    const sponsor = await client.user.findFirst({}).OrganizationUsers({ where: { userId: id } });
  

  const { password, confirmPassword, ...userToCreate } = rest;
  const [org, user] = await client.$transaction([
    client.organization.create({ data: { name: organizationName } }),
    client.user.create({ data: { ...userToCreate, password: await argon2.hash(password) } }),
  ]);
  const orgUser = await client.organizationUsers.create({ data: { userId: user.id, organizationId: org.id } });

  client.$disconnect();
  return res.status(200).json({ message: "Hello World" });
}
