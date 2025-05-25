"use client";

import { TextField } from "@radix-ui/themes/components/index";
import Link from "next/link";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type VerifyCodeData = {
  code: string;
};

export default function FormVerifyCode() {
  const method = useForm<VerifyCodeData>({
    defaultValues: {
      code: "",
    },
  });
  const onSubmit: SubmitHandler<VerifyCodeData> = (data) => console.log(data);

  return (
    <>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="flex flex-col lg:gap-6 gap-4"
        >
          <Controller
            name="code"
            control={method.control}
            rules={{
              required: "Verification code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Code must be a 6-digit number",
              },
            }}
            render={({ field }) => (
              <div className="input-wrapper">
                <TextField.Root
                  {...field}
                  placeholder="123456"
                  type="text"
                  maxLength={6}
                />
                {method.formState.errors.code && (
                  <p className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.code.message}
                  </p>
                )}
              </div>
            )}
          />
          <p className="text-sm font-medium">
            Didn’t receive a code?{" "}
            <Link href="signup" className="text-[#FF8682] hover:underline">
              Resend
            </Link>
          </p>
          <div className="flex items-center gap-4 flex-col">
            <button type="submit" className="hover:opacity-75">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
