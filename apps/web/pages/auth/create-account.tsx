import { AuthCard } from "@/components";
import { Action, reducer } from "@/utils/formReducer";
import { InferGetServerSidePropsType } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, useSession } from "next-auth/react";
import { useEffect, useReducer, useRef } from "react";

import { Button, TextField } from "@mui/material";
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { type CreateAccountReqType } from '../api/auth/create-account';


function CreateAccount({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  const [state, stateDispatch] = useReducer(reducer<CreateAccountReqType>, {});
  const [errors, errorDispatch] = useReducer(reducer<CreateAccountReqType>, {});
  const ref = useRef(null);

  function validate(password: string) {
    var minMaxLength = /^[\s\S]{8,64}$/,
      upper = /[A-Z]/,
      lower = /[a-z]/,
      number = /[0-9]/,
      special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (minMaxLength.test(password) &&
      upper.test(password) &&
      lower.test(password) &&
      number.test(password) &&
      special.test(password)
    ) {
      return true;
    }

    return false;
  }

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    errorDispatch({ type: Action.RESET, value: {} });

    Object.keys(state).forEach(key => {
      if (key.trim() === "") {
        errorDispatch({ type: Action.SET, key, value: "This field is required" });
      } else if (key === "password") {
        if (!validate(state.password)) {
          errorDispatch({ type: Action.SET, key: "password", value: "This password is too weak." });
        }
      } else if (key === "confirmPassword") {
        if (state.password !== state.confirmPassword) {
          errorDispatch({ type: Action.SET, key: "confirmPassword", value: "Passwords must match" });
        }
      }
    });

    if (Object.keys(errors).length > 0 || !csrfToken) return;

    const res = await fetch("/api/auth/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify({
        session,
        data: state,
      })
    });

    const body = await res.json();
    console.log(body);
  }

  function handleInputChange(key: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (key === "organization" && session) return;

    stateDispatch({
      type: Action.SET,
      key,
      value: e.target.value,
    });
  }

  useEffect(() => {
    if (!errors.password || !errors.confirmPassword) return;

    if (!validate(state.password)) {
      errorDispatch({ type: Action.SET, key: "password", value: null });
    }

    if (state.password === state.confirmPassword) {
      errorDispatch({ type: Action.SET, key: "password", value: null });
      errorDispatch({ type: Action.SET, key: "confirmPassword", value: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.password, state.confirmPassword]);

  return (
    <AuthCard>
      <form
        className="flex w-full flex-col items-center justify-center font-bold gap-6"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} />
        <TextField
          label="Username"
          name="username"
          fullWidth
          variant="filled"
          required
          error={!!errors.username}
          helperText={errors.username}
          onChange={e => handleInputChange("username", e)} />
        <TextField
          type="email"
          name="email"
          label="Email"
          fullWidth
          variant="filled"
          required
          error={errors.email}
          onChange={e => handleInputChange("email", e)} />
        <TextField
          type="password"
          name="password"
          ref={ref}
          label="Password"
          fullWidth
          variant="filled"
          required
          error={!!errors.password}
          helperText={errors.password}
          onChange={e => handleInputChange("password", e)} />
        <TextField
          type="password"
          name="confirm-password"
          label="Confirm password"
          fullWidth
          variant="filled"
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          onChange={e => handleInputChange("confirmPassword", e)} />
        <TextField
          label="Organization"
          name="organization"
          fullWidth
          variant="filled"
          InputProps={{ readOnly: !!session }}
          required
          error={!!errors.organization}
          helperText={errors.organization}
          onChange={e => handleInputChange("organization", e)} />
        <Button variant="outlined" color="primary" type="submit" fullWidth size="large">
          Create account
        </Button>
      </form>
      <PopperUnstyled
        className="bg-white p-4 z-[1000]"
        open={!!errors.password}
        anchorEl={ref && ref.current}
        placement="right"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          }
        ]}>
        <div className="font-light text-xs">
          Your password must be:
          {
            [
              "between 8 and 64 characters",
              "contain at least one number",
              "contain at least one uppercase letter",
              "contain at least one lowercase letter",
              "contain at least one special character",
            ].map((text, i) => <li key={i}>{text}</li>)
          }
        </div>
      </PopperUnstyled>
    </AuthCard>

  );
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken: csrfToken ?? null },
  };
}

export default CreateAccount;
