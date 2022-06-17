import prismaClient from "@/lib/prisma.client";
import withErrorHandler, { ResponseOutput } from "@/lib/withErrorHandler";
import { log } from "@/utils/logger";
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
            log.info(new ResponseOutput(`Organization ${organization.name} created.`, 201, req.url));
            return organization;
          })
          .catch(e => {
            throw new ResponseOutput(`Organization ${orgName} already exists.`, 400, req.url, e.meta?.target, e.code);
          })
      : await prismaClient.organization
          .findFirst({ where: { name: orgName } })
          .then(organization => {
            organization && log.info(new ResponseOutput(`Organization ${organization.name} found.`, 200, req.url));
            return organization;
          })
          .catch(e => {
            throw new ResponseOutput(
              `Error while searching for organization ${orgName}`,
              400,
              req.url,
              ...e.meta?.target,
              e.code,
            );
          });

    if (!organization) {
      throw new ResponseOutput("Missing organization - returning.", 400);
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
        log.info(new ResponseOutput(`User ${user.username} created`, 201, req.url));
        return user;
      })
      .catch(e => {
        const targetMessage =
          e.meta?.target[0] === "email" ? `email ${userData.email}` : `username ${userData.username}`;
        throw new ResponseOutput(`User with ${targetMessage} already exists.`, 400, req.url, e.meta?.target, e.code);
      });

    if (!user) {
      throw new ResponseOutput("Missing user - returning.", 400);
    }

    log.info(new ResponseOutput(`User ${user.username} added to organization ${organization.name}.`, 201, req.url));

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
