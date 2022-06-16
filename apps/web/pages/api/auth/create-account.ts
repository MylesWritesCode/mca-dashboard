import prismaClient from "@/lib/prisma.client";
import withErrorHandler, { ResponseError } from "@/lib/withErrorHandler";
import { logger } from "@/utils/logger";
import { User } from "@prisma/client";
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
    const sponsor =
      session &&
      (await prismaClient.user.findFirst({
        where: { id: session?.user.id },
        include: { organization: { select: { name: true } } },
      }));

    orgName = sponsor?.organization.name || orgName;

    const organization = !session
      ? await prismaClient.organization
          .create({ data: { name: orgName } })
          .then(organization => {
            logger.info(`Organization ${organization.name} created.`);
            return organization;
          })
          .catch(e => {
            throw new ResponseError(`Organization ${orgName} already exists.`, e.code, 400, e.meta?.target);
          })
      : await prismaClient.organization
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

    const user: User = await prismaClient.user
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
      throw new ResponseError("Missing user - returning.", "", 400);
    }

    logger.info(
      `User ${user.username} added to organization ${organization.name} with details: ${JSON.stringify(res)}`,
    );

    return res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        organization: organization.name,
        sponsor: sponsor?.username,
      },
    });
  }

  await withErrorHandler(req, res, { POST });
}

export default CreateAccount;
