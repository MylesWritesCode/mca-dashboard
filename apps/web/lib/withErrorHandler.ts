import { logger } from "@/utils/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export class ResponseError extends Error {
  constructor(
    public message: string = "Internal server error.",
    public code?: string,
    public status = 500,
    public target?: string[],
    public url?: string,
  ) {
    super(message);
  }
}

export default async function withErrorHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  actions: { [key: string]: () => Promise<void> },
) {
  try {
    const method = req.method;
    if (method && !Object.keys(actions).includes(method)) {
      throw new ResponseError(`Method ${method} not allowed.`, undefined, 405);
    }

    if (method) await actions[method]();
  } catch (e: any) {
    let error: ResponseError = new ResponseError(e.message, e.code, e.status, e.target, req.url);

    if (e instanceof PrismaClientKnownRequestError) {
      error = new ResponseError(e.message.split("\n")[1].trim(), e.code, 400, (e.meta?.target as string[]) || []);
    }

    const logMsg = {
      status: error.status,
      code: error.code,
      url: error.url,
      target: error.target,
      message: error.message,
    };

    logger.error(JSON.stringify(logMsg));
    res.status(error.status).json({ error: logMsg });
  }
}
