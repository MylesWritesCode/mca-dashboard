import { InferGetServerSidePropsType } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import {
  getProviders,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Card } from "ui/components/Card";

import styles from "./auth.module.scss";

function Login({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // "linear-gradient(45deg, rgb(64, 201, 255) 0%, rgb(232, 28, 255) 100%);",
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center z-10">
        <Card
          className={[
            "align-center relative flex flex-col justify-center p-12 border-1",
            // "before:bg-gradient-to-tr before:from-[#40c9ff] before:to-[#e81cff] before:blur-none",
            "before:absolute before:z-[-1] before:h-full before:w-full",
            "before:overflow-hidden before:top-0 before:left-0",
          ].join(" ")}
        >
          <NextImage
            src="/logo.png"
            alt="logo"
            height="100%"
            width="300px"
            objectFit="contain"
          />
          <form
            className={[
              "flex w-full flex-col items-center justify-center font-bold",
              styles.auth__form,
            ].join(" ")}
            method="post"
            action="/api/auth/callback/credentials"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
              <span>Username</span>
              <input name="username" type="text" placeholder="Username" />
            </label>
            <label>
              <span>Password</span>
              <input name="password" type="password" placeholder="Password" />
            </label>
            <button type="submit" className="bg-primary-light w-72">
              Sign in
            </button>
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
                    <button
                      className="w-72 p-2 font-semibold"
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </button>
                  </div>
                );
              }
            })}
        </Card>
      </div>
      {/* </div> */}
    </section>
  );
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken },
  };
}

export default Login;
