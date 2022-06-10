import withErrorHandler, { ResponseError } from "@/lib/withErrorHandler";
import * as logger from "@/utils/logger";
import { Organization, OrganizationUsers, PrismaClient, User } from "@prisma/client";
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
    let sponsor: (User & { OrganizationUsers: (OrganizationUsers & { organizations: Organization })[] }) | undefined =
      undefined;

    const transaction = await client.$transaction(async prisma => {
      if (session) {
        sponsor =
          (await prisma.user.findFirst({
            where: { id: session.user.id },
            include: { OrganizationUsers: { include: { organizations: true } } },
          })) || undefined;
        orgName = sponsor?.OrganizationUsers[0].organizations.name || orgName;
      }

      const organization: Organization | null = !session
        ? await prisma.organization.create({ data: { name: orgName } }).catch(e => {
            throw new ResponseError(`Organization ${orgName} already exists.`, e.code, 400, e.meta?.target);
          })
        : await prisma.organization.findFirst({ where: { name: orgName } }).catch(e => {
            throw new ResponseError(`Organization ${orgName} not found.`, e.code, 400, e.meta?.target);
          });

      if (organization) logger.info(`Organization ${organization.name} created.`);

      const user: User = await prisma.user
        .create({
          data: { ...userData, password: await argon2.hash(password), userId: sponsor?.id },
        })
        .catch(e => {
          throw new ResponseError(
            `User with ${e.meta?.target[0] === "email" ? userData.email : userData.username} already exists.`,
            e.code,
            400,
            e.meta?.target,
          );
        });

      if (user) logger.info(`User ${user.username} created`);

      if (organization && user) {
        await prisma.organizationUsers.create({
          data: { userId: user.id, organizationId: organization.id },
        });

        const res = {
          id: user.id,
          username: user.username,
          email: user.email,
          organization: organization.name,
          sponsor: sponsor?.username,
        };

        logger.info(
          `User ${user.username} added to organization ${organization.name} with details: ${JSON.stringify(res)}`,
        );

        return res;
      }
    });
    client.$disconnect();

    return res.status(201).json({ user: { ...transaction } });
  }

  await withErrorHandler(req, res, { POST });
}

export default CreateAccount;
