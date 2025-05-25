"use client";

import { TextField } from "@radix-ui/themes";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormDivider from "./FormDivider";
import LoginThirdParty from "./LoginThirdParty";

type ForgotPasswordData = {
  email: string;
};

export default function FormForgotPassword() {
  const method = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit: SubmitHandler<ForgotPasswordData> = (data) =>
    console.log(data);

  return (
    <>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="flex flex-col lg:gap-6 gap-4"
        >
          <Controller
            name="email"
            control={method.control}
            rules={{
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            }}
            render={({ field }) => (
              <div className="input-wrapper">
                <TextField.Root
                  {...field}
                  placeholder="john.doe@gmail.com"
                  type="email"
                />
                {method.formState.errors.email && (
                  <p className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.email.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className="lg:mt-10 flex items-center gap-4 flex-col">
            <button type="submit" className="hover:opacity-75">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
      <FormDivider text={"Or login with"} />
      <LoginThirdParty />
    </>
  );
}
