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

  const sessionUserId = "cl44wrmp7000408ak5wla2tsw";

  const sponsor = await client.user.findFirst({ 
    where: { id: sessionUserId }, 
    include: { OrganizationUsers: { include: { organizations: true } } } 
  });

  console.log(sponsor?.OrganizationUsers[0].organizations.name);

  if (session) {
    await client.$transaction(async () => {
      const sponsor = await client.user.findFirst({ 
        where: { id: sessionUserId }, 
        include: { OrganizationUsers: { include: { organizations: true } } } 
      });
      console.log(sponsor);
      if (!sponsor) return;
      
    //   const sponsorOrg = await client.organization.findFirst({ where: { name: sponsor }})
    //   return Promise<string>.reject("some failure");
    });
  }

  client.$disconnect();
  return res.status(200).json({ message: "Hello World" });
}
