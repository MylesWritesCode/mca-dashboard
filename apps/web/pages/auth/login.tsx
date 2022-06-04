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

import styles from "./auth.module.scss";

function Login({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(providers);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center w-72 h-full">
        <NextImage
          src="/logo.png"
          alt="logo"
          height="100%"
          width="300px"
          objectFit="contain"
        />
        <form
          className={[
            "flex flex-col justify-center items-center w-full font-bold",
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
          <button type="submit" className="w-72 bg-primary-light">
            Sign in
          </button>
        </form>
        <div className="flex justify-evenly items-center m-4 w-full">
          <div className="mx-2 bg-primary-dark w-16 h-[2px]"></div>
          <span>or sign in with</span>
          <div className="mx-2 bg-primary-dark w-16 h-[2px]"></div>
        </div>
        {providers &&
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
      </div>
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
