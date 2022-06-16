import prismaClient from "@/lib/prisma.client";
import withErrorHandler, { ResponseError } from "@/lib/withErrorHandler";
import { logger } from "@/utils/logger";
import { Organization, User } from "@prisma/client";
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export interface CreateAccountReqType {
  session?: Session;
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    organization: string;
  };
}

export interface CreateAccountResType {
  id: string | null;
  username: string | null;
  email: string | null;
  organization: string;
  sponsor: string | null | undefined;
}

export async function CreateAccount(req: NextApiRequest, res: NextApiResponse) {
  async function POST() {
    const { session, data }: CreateAccountReqType = req.body;
    let { organization: orgName, password, confirmPassword, ...userData } = data;
    let sponsor: (User & { organization: { name: string } }) | undefined = undefined;

    if (session) {
      sponsor =
        (await prismaClient.user.findFirst({
          where: { id: session.user.id },
          include: { organization: { select: { name: true } } },
        })) || undefined;
      orgName = sponsor?.organization.name || orgName;
    }

    console.log("outside transaction");
    const transaction = await prismaClient.$transaction(async prisma => {
      console.log("in transaction");

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

      if (!organization) {
        throw new ResponseError("Missing organization - returning.", "", 400);
      }

      const user: User = await prisma.user
        .create({
          data: {
            ...userData,
            password: await argon2.hash(password),
            organizationId: organization.id,
            createdById: sponsor?.id,
          },
        })
        .then(user => {
          logger.info(`User ${user.username} created`);
          return user;
        })
        .catch(e => {
          const targetMessage =
            e.meta?.target[0] === "email" ? `email ${userData.email}` : `username ${userData.username}`;
          throw new ResponseError(`User with ${targetMessage} already exists.`, e.code, 400, e.meta?.target);
        });

      if (!user) {
        throw new ResponseError("Missing organization - returning.", "", 400);
      }

      const res: CreateAccountResType = {
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

    return res.status(201).json({ user: { ...transaction } });
  }

  await withErrorHandler(req, res, { POST });
}

export default CreateAccount;
