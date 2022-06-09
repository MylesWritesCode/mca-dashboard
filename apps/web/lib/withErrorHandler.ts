import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type ErrorType = { message: string; code: string; status: number; target?: string[] };

export default async function withErrorHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return async function (handler: NextApiHandler) {
      return handler(req, res);
    };
  } catch (e: any) {
    const error: ErrorType = { message: "Unknown server error.", code: "0000", status: 400 };

    console.log("does this error out");

    console.log("from error handler:", e);

    if (e.message) {
      console.log("found message");
      error.message = e.message;
    }

    return new Response(
      JSON.stringify({
        // error: error.message || "Unknown server error.",
        // code: error.code || "0000",
        error: "Unknown server error.",
        code: "0000",
      }),
      {
        // status: error.status || 300,
        status: 300,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
