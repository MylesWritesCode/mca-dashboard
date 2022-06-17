import { log } from "@/utils/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export class ResponseOutput {
  constructor(
    public message: string = "Internal server error.",
    public status = 500,
    public url?: string,
    public target?: string[],
    public code?: string,
  ) {}
}

export type ResponseOutputType = {
  message: string;
  status: number;
  url?: string;
  target?: string[];
  code?: string;
};

export default async function withErrorHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  actions: { [key: string]: () => Promise<void> },
) {
  try {
    const method = req.method;
    if (method && !Object.keys(actions).includes(method)) {
      throw new ResponseOutput(`Method ${method} not allowed.`, 405);
    }

    if (method) await actions[method]();
  } catch (e: any) {
    let error: ResponseOutput = new ResponseOutput(e.message, e.status, req.url, e.target, e.code);

    if (e instanceof PrismaClientKnownRequestError) {
      error = new ResponseOutput(
        e.message.split("\n")[1].trim(),
        400,
        req.url,
        (e.meta?.target as string[]) || [],
        e.code,
      );
    }

    log.error(error);
    res.status(error.status).json({ error });
  }
}
