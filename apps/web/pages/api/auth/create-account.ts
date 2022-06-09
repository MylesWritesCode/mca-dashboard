import { Organization, PrismaClient, User } from "@prisma/client";
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

type ErrorType = { error?: string };

export default async function CreateAccount(req: NextApiRequest, res: NextApiResponse) {
  const { session, data }: CreateAccountReqType = req.body;
  let { organization: orgName, password, confirmPassword, ...userData } = data;

  const transaction = await client.$transaction(async prisma => {
    if (session) {
      const sponsor = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: { OrganizationUsers: { include: { organizations: true } } },
      });
      orgName = sponsor?.OrganizationUsers[0].organizations.name || orgName;
    }

    const organization: Organization & ErrorType = await prisma.organization
      .create({ data: { name: orgName } })
      .catch(e => e);
    const user: User & ErrorType = await prisma.user
      .create({
        data: { ...userData, password: await argon2.hash(password) },
      })
      .catch(e => e);

    if (user.error || organization.error) {
      return {
        error: {
          user: user.error,
          organization: organization.error,
        },
      };
    } else if (organization.id && user.id) {
      await prisma.organizationUsers
        .create({
          data: { userId: user.id, organizationId: organization.id },
        })
        .catch(e => e);

      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }
  });

  console.log(transaction);

  if (transaction?.error) {
    return res.status(400).json({ errors: transaction.error });
  } else {
    return res.status(201).json({
      user: {
        id: transaction?.id,
        username: transaction?.username,
        email: transaction?.email,
      },
    });
  }
}
