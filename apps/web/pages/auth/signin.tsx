import { InferGetServerSidePropsType } from "next";
import {
  getProviders,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";

import styles from "./auth.module.scss";

function SignIn({
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
  }, [session]);

  return (
    <section className={styles.auth}>
      <div className={styles.auth__container}>
        <img src="/logo.png" alt="logo" className={styles.auth__logo} />
        <form
          className={styles.auth__form}
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
          <button type="submit" className={styles.button}>
            Sign in
          </button>
        </form>
        <div className={styles.divider}>
          <div className={styles.spacer}></div>
          <span>or sign in with</span>
          <div className={styles.spacer}></div>
        </div>
        {providers &&
          Object.values(providers).map((provider, i) => {
            if (provider.id !== "email") {
              return (
                <div key={provider.name} className={styles.icon}>
                  <button
                    className={styles.button}
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

export default SignIn;
