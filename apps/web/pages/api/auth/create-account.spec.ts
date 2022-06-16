import { prismaMock } from "@/lib/prisma.mock";
import * as argon from "argon2";
import { createMocks, RequestMethod } from "node-mocks-http";

import { CreateAccount, CreateAccountReqType } from "./create-account";

describe("/auth/create-account", () => {
  test("should be a function", () => {
    expect(typeof CreateAccount).toBe("function");
  });

  const FRONTEND_REQ: CreateAccountReqType = {
    session: {
      user: {
        id: "sponsor_00111p9k1c1cufb9p",
        username: "myles.berueda",
        organization: "An Organization",
      },
      expires: "2022-06-15 04:05:56.22",
    },
    data: {
      username: "test.user",
      email: "test@user.io",
      password: "s0mel0ngp4ssw0rd",
      confirmPassword: "s0mel0ngp4ssw0rd",
      organization: "The Test Organization",
    },
  };

  const SPONSOR = {
    id: FRONTEND_REQ!.session!.user.id,
    username: FRONTEND_REQ.data.username,
    email: FRONTEND_REQ.data.email,
    name: "Myles Berueda",
    organization: FRONTEND_REQ!.session!.user.organization,
    password: "s0mel0ngp4ssw0rdEncrypted",
    emailVerified: null,
    image: null,
    organizationId: "organization1p9k1c1cufb9p",
    createdAt: new Date("2022-06-15 04:05:56.22"),
    modifiedAt: new Date("2022-06-15 04:05:56.22"),
    createdById: null,
    roleId: null,
  };

  const SPONSOR_ORGANIZATION = {
    id: "sponsored_organization_9p",
    name: FRONTEND_REQ!.session!.user.organization,
    createdAt: new Date("2022-06-15 04:05:56.22"),
    modifiedAt: new Date("2022-06-15 04:05:56.22"),
  };

  const ORGANIZATION = {
    id: "created_organization_fb9p",
    name: "The Test Organization",
    createdAt: new Date("2022-06-15 04:05:56.22"),
    modifiedAt: new Date("2022-06-15 04:05:56.22"),
  };

  it("should reject non-POST methods", async () => {
    const methods = ["GET", "PUT", "DELETE", "PATCH", "CONNECT", "HEAD", "OPTIONS", "TRACE"];

    methods.forEach(async method => {
      const { req, res } = createMocks({
        method: method as RequestMethod,
        body: FRONTEND_REQ,
        url: "/api/auth/create-account",
      });

      const expected = {
        error: {
          message: `Method ${method} not allowed.`,
          status: 405,
          url: "/api/auth/create-account",
        },
      };

      await CreateAccount(req, res);

      expect(res._getStatusCode()).toBe(405);
      expect(res._getJSONData()).toMatchObject(expected);
    });
  });

  it("should create a user with a sponsor", async () => {
    const expected = {
      user: {
        id: "created_user_fb9p",
        username: FRONTEND_REQ.data.username,
        email: FRONTEND_REQ.data.email,
        organization: SPONSOR_ORGANIZATION.name,
        sponsor: SPONSOR.username,
      },
    };
    const password = await argon.hash(FRONTEND_REQ.data.password);

    const { req, res } = createMocks({ method: "POST", body: FRONTEND_REQ, url: "/auth/create-account" });

    prismaMock.user.findFirst.mockResolvedValue(SPONSOR);
    prismaMock.organization.findFirst.mockResolvedValue(SPONSOR_ORGANIZATION);

    prismaMock.user.create.mockResolvedValue({
      id: expected.user.id,
      username: FRONTEND_REQ.data.username,
      email: FRONTEND_REQ.data.email,
      password,
      organizationId: SPONSOR_ORGANIZATION.id,
      name: null,
      image: null,
      emailVerified: null,
      createdById: null,
      roleId: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    await CreateAccount(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toMatchObject(expected);
  });

  it("should create a user and organization without a sponsor", async () => {
    const expected = {
      user: {
        id: ORGANIZATION.id,
        username: FRONTEND_REQ.data.username,
        email: FRONTEND_REQ.data.email,
        organization: ORGANIZATION.name,
      },
    };
    const { data } = FRONTEND_REQ;
    const password = await argon.hash(FRONTEND_REQ.data.password);

    const { req, res } = createMocks({ method: "POST", body: { data }, url: "/auth/create-account" });

    prismaMock.organization.create.mockResolvedValue(ORGANIZATION);
    prismaMock.user.create.mockResolvedValue({
      id: expected.user.id,
      username: FRONTEND_REQ.data.username,
      email: FRONTEND_REQ.data.email,
      password,
      organizationId: ORGANIZATION.id,
      name: null,
      image: null,
      emailVerified: null,
      createdById: null,
      roleId: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    await CreateAccount(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toMatchObject(expected);
  });
});
