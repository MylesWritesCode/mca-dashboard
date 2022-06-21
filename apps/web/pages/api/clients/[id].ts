import prismaClient from "@/lib/prisma.client";
import withErrorHandler, { ResponseOutput } from "@/lib/withErrorHandler";
import { log } from "@/utils/logger";
import { User } from "@prisma/client";
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export async function ClientById(req: NextApiRequest, res: NextApiResponse) {
  async function POST() {
    return res.status(200).json({
      message: "unimplemented POST",
    });
  }

  async function GET() {
    return res.status(200).json({
      message: "unimplemented GET",
    });
  }

  await withErrorHandler(req, res, { POST, GET });
}

export default ClientById;
