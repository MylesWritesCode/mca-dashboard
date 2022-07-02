import { prismaMock } from '@/lib/prisma.mock';
import { createMocks } from 'node-mocks-http';
import { CreateAccount, type CreateAccountReqType } from './create-account'; 

describe('/auth/create-account', () => {
  test('should be a function', () => {
    expect(typeof CreateAccount).toBe('function');
  });
  
  const FRONTEND_REQ: CreateAccountReqType = {
    session: undefined,
    data: {
      username: 'test.user',
      email: 'test@user.io',
      password: 's0mel0ngp4ssw0rd',
      confirmPassword: 's0mel0ngp4ssw0rd',
      organization: 'The Test Organization',
    }
  }

  const EXPECTED_ORGANIZATION = {
    id: 'cl4f2m1z00111p9k1c1cufb9p',
    name: 'The Test Organization',
    createdAt: new Date('2022-06-15 04:05:56.22'),
    modifiedAt: new Date('2022-06-15 04:05:56.22'),
  }

  const EXPECTED_USER = {
    id: 'cl4f2m1z00111p9k1c1cufb9p',
    username: FRONTEND_REQ.data.username,
    email: FRONTEND_REQ.data.email,
    name: 'Myles Berueda',
    organization: EXPECTED_ORGANIZATION.name,
    password: 's0mel0ngp4ssw0rdEncrypted',
    emailVerified: null,
    image: null,
    organizationId: 'cl4f2m1z00111p9k1c1cufb9p',
    createdAt: new Date('2022-06-15 04:05:56.22'),
    modifiedAt: new Date('2022-06-15 04:05:56.22'),
    createdById: null,
    roleId: null,
  }

  const EXPECTED_TRANSACTION = {
    id: EXPECTED_USER.id,
    username: EXPECTED_USER.username,
    email: EXPECTED_USER.email,
    organization: EXPECTED_ORGANIZATION.name,
    sponsor: undefined,
  };
    
  it('should create a new organiation and user', async () => {
    const { req, res } = createMocks({ method: 'POST', body: FRONTEND_REQ });

    prismaMock.organization.create.mockResolvedValue(EXPECTED_ORGANIZATION).mockName('createOrganization');
    prismaMock.user.create.mockResolvedValue(EXPECTED_USER).mockName('createUser');

    await CreateAccount(req, res);

    const expected = {
        id: EXPECTED_USER.id,
        username: FRONTEND_REQ.data.username,
        email: FRONTEND_REQ.data.email,
        organization: FRONTEND_REQ.data.organization,
    };

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual(expect.objectContaining(expected));
  });
});