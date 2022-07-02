import withErrorHandler, { ErrorType } from "@/lib/withErrorHandler";
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

    const transaction = await client
      .$transaction(async prisma => {
        if (session) {
          const sponsor = await prisma.user.findFirst({
            where: { id: session.user.id },
            include: { OrganizationUsers: { include: { organizations: true } } },
          });
          orgName = sponsor?.OrganizationUsers[0].organizations.name || orgName;
        }

        const organization: Organization = await prisma.organization.create({ data: { name: orgName } });
        const user: User = await prisma.user.create({
          data: { ...userData, password: await argon2.hash(password) },
        });

        if (organization.id && user.id) {
          await prisma.organizationUsers.create({
            data: { userId: user.id, organizationId: organization.id },
          });

          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        }
      })
      // .catch(e => {
      //   throw new ErrorType(e.message, e.code, 403, ["organization", "user"]);
      // });

    client.$disconnect();

    console.log("transaction:", transaction);

    return res.status(201).json({
      user: {
        id: transaction?.id,
        username: transaction?.username,
        email: transaction?.email,
      },
    });
  }

  await withErrorHandler(req, res, { POST });
}

export default CreateAccount;
