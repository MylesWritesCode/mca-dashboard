import { AuthCard } from "@/components";
import { Action, reducer } from "@/utils/formReducer";
import { InferGetServerSidePropsType } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, useSession } from "next-auth/react";
import { useReducer, useState } from "react";

import { TextField } from "@mui/material";

import styles from "./auth.module.scss";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  organization: "",
};

function Login({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(state);
  }

  function handleInputChange(key: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (key === "organization" && session) return;

    dispatch({
      type: Action.SET,
      key,
      value: e.target.value,
    });
  }

  return (
    <AuthCard>
      <form
        className="flex w-full flex-col items-center justify-center font-bold gap-6"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <TextField
          label="Username"
          fullWidth
          variant="filled"
          required
          onChange={e => handleInputChange("username", e)}
        />
        <TextField label="Email" fullWidth variant="filled" required onChange={e => handleInputChange("email", e)} />
        <TextField
          type="password"
          label="Password"
          fullWidth
          variant="filled"
          required
          onChange={e => handleInputChange("password", e)}
        />
        <TextField
          type="password"
          label="Current password"
          fullWidth
          variant="filled"
          required
          onChange={e => handleInputChange("confirmPassword", e)}
        />
        <TextField
          label="Organization"
          fullWidth
          variant="filled"
          InputProps={{ readOnly: !!session }}
          required
          onChange={e => handleInputChange("organization", e)}
        />
        <button type="submit" className="bg-primary-light w-72">
          Create account
        </button>
      </form>
    </AuthCard>
  );
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken },
  };
}

export default Login;
