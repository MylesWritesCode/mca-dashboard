import { AuthCard } from "@/components";
import { InferGetServerSidePropsType } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import { getProviders, signIn, getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { TextField, Button } from "@mui/material";

function Login({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <AuthCard>
      <form
        className="flex w-full flex-col items-center justify-center font-bold gap-6"
        method="POST"
        action="/api/auth/callback/credentials"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} />
        <TextField label="Username" name="username" fullWidth variant="filled" required />
        <TextField type="password" name="password" label="Password" fullWidth variant="filled" required />
        <Button variant="outlined" color="primary" type="submit" fullWidth size="large">
          Create account
        </Button>
      </form>
      {providers && Object.keys(providers).length > 1 && (
        <div className="m-4 flex w-full items-center justify-evenly">
          <div className="bg-primary-dark mx-2 h-[2px] w-16"></div>
          <span>or sign in with</span>
          <div className="bg-primary-dark mx-2 h-[2px] w-16"></div>
        </div>
      )}
      {providers &&
        Object.keys(providers).length > 1 &&
        Object.values(providers).map((provider, i) => {
          if (provider.id !== "email") {
            return (
              <div key={provider.name}>
                <button className="w-72 p-2 font-semibold" onClick={() => signIn(provider.id)}>
                  {provider.name}
                </button>
              </div>
            );
          }
        })}
    </AuthCard>
  );
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken: csrfToken ?? null },
  };
}

export default Login;
