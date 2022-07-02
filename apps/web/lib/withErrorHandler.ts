import * as logger from "@/utils/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export class ErrorType extends Error {
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
      throw { message: `Method ${method} not supported`, status: 405 };
    }

    if (method) await actions[method]();
  } catch (e: any) {
    let error: ErrorType = new ErrorType(e);
    error.url = req.url;

    if (e instanceof ErrorType) {
      error = e as ErrorType;
    } else if (e instanceof PrismaClientKnownRequestError) {
      error.message = e.message.split("\n")[1].trim();
      error.code = e.code;
      error.status = 400;
      error.target = (e.meta?.target as string[]) || [];
    }

    logger.error(JSON.stringify({ ...error, message: error.message }));
    res.status(error.status).json({ error: { ...error, message: error.message } });
  }
}
