import withErrorHandler, { ResponseError } from "@/lib/withErrorHandler";
import * as logger from "@/utils/logger";
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
    let sponsor: (User & { organization: { name: string } }) | undefined = undefined;

    const transaction = await client.$transaction(async prisma => {
      if (session) {
        sponsor =
          (await prisma.user.findFirst({
            where: { id: session.user.id },
            include: { organization: { select: { name: true } } },
          })) || undefined;
        orgName = sponsor?.organization.name || orgName;
      }

      const organization: Organization | null = !session
        ? await prisma.organization
            .create({ data: { name: orgName } })
            .then(organization => {
              logger.info(`Organization ${organization.name} created.`);
              return organization;
            })
            .catch(e => {
              throw new ResponseError(`Organization ${orgName} already exists.`, e.code, 400, e.meta?.target);
            })
        : await prisma.organization
            .findFirst({ where: { name: orgName } })
            .then(organization => {
              organization && logger.info(`Organization ${organization.name} found.`);
              return organization;
            })
            .catch(e => {
              throw new ResponseError(`Error while searching for organization ${orgName}`, e.code, 400, e.meta?.target);
            });

      if (!organization) return;

      const user: User = await prisma.user
        .create({
          data: {
            ...userData,
            password: await argon2.hash(password),
            organization: { connect: { id: organization.id } },
            createdBy: { connect: { id: session?.user.id } },
          },
        })
        .catch(e => {
          const targetMessage =
            e.meta?.target[0] === "email" ? `email ${userData.email}` : `username ${userData.username}`;
          throw new ResponseError(`User with ${targetMessage} already exists.`, e.code, 400, e.meta?.target);
        });

      if (user) logger.info(`User ${user.username} created`);

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
    });
    client.$disconnect();

    return res.status(201).json({ user: { ...transaction } });
  }

  await withErrorHandler(req, res, { POST });
}

export default CreateAccount;
