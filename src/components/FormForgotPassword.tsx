"use client";

import { MESSAGES } from "@/constants/messages";
import { toast } from "@/hooks/use-toast";
import { forgotPassword } from "@/services/auth.service";
import { TOAST_STYLE } from "@/styles/toast.style";
import { TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormDivider from "./FormDivider";
import LoginThirdParty from "./LoginThirdParty";
import SubmitButton from "./SubmitButton";

type ForgotPasswordData = {
  email: string;
};

export default function FormForgotPassword() {
  const method = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const res = await forgotPassword(data.email);
      if (!res.status) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (data) => {
      // Handle success, e.g., show a success message or redirect
      toast({
        title: "Success",
        description: data.message || MESSAGES.AUTH.RESET_PASSWORD_SUCCESS,
        style: TOAST_STYLE.success,
      });
    },
    onError: (error) => {
      console.error("Error:", error);
      // Handle error, e.g., show an error message
      method.setError("email", {
        type: "manual",
        message: error.message,
      });

      toast({
        title: "Error",
        description: error.message || MESSAGES.AUTH.RESET_PASSWORD_FAILURE,
        style: TOAST_STYLE.error,
      });
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = useCallback(
    (data) => mutateAsync(data),
    [mutateAsync],
  );

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
          <div className="flex items-center gap-4 flex-col">
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </FormProvider>
      <FormDivider text={"Or login with"} />
      <LoginThirdParty />
    </>
  );
}
