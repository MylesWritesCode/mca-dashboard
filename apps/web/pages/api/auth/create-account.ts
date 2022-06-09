import withErrorHandler, { ResponseError } from "@/lib/withErrorHandler";
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

export async function CreateAccount(req: NextApiRequest, res: NextApiResponse) {
  async function POST() {
    const { session, data }: CreateAccountReqType = req.body;
    let { organization: orgName, password, confirmPassword, ...userData } = data;
    let sponsor = null;

    const transaction = await client.$transaction(async prisma => {
      if (session) {
        sponsor = await prisma.user.findFirst({
          where: { id: session.user.id },
          include: { OrganizationUsers: { include: { organizations: true } } },
        });
        orgName = sponsor?.OrganizationUsers[0].organizations.name || orgName;
      }

      const organization: Organization | null = !session
        ? await prisma.organization.create({ data: { name: orgName } }).catch(e => {
            throw new ResponseError(`Organization ${orgName} already exists.`, e.code, 400, e.meta?.target);
          })
        : await prisma.organization.findFirst({ where: { name: orgName } }).catch(e => {
            throw new ResponseError(`Organization ${orgName} not found.`, e.code, 400, e.meta?.target);
          });

      const user: User = await prisma.user
        .create({
          data: { ...userData, password: await argon2.hash(password) },
        })
        .catch(e => {
          throw new ResponseError(
            `User with ${e.meta?.target[0] === "email" ? userData.email : userData.username} already exists.`,
            e.code,
            400,
            e.meta?.target,
          );
        });

      if (organization && user) {
        await prisma.organizationUsers.create({
          data: { userId: user.id, organizationId: organization.id },
        });

        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      }
    });
    client.$disconnect();

    console.log("transaction:", transaction);

    return res.status(201).json({ user: { ...transaction } });
  }

  await withErrorHandler(req, res, { POST });
}

export default CreateAccount;
