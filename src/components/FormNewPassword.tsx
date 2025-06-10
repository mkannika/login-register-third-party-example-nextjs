"use client";

import { toast } from "@/hooks/use-toast";
import { resetPassword } from "@/services/auth.service";
import { TOAST_STYLE } from "@/styles/toast.style";
import { TextField } from "@radix-ui/themes/components/index";
import { useMutation } from "@tanstack/react-query";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import SubmitButton from "./SubmitButton";

type NewPasswordData = {
  password: string;
  confirmPassword: string;
};

export default function FormNewPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (typeof queryToken === "string" && queryToken.length > 0) {
      setToken(queryToken);
    }
  }, [searchParams]);

  const method = useForm<NewPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: NewPasswordData) => {
      if (!token) {
        throw new Error("Token is required for password reset");
      }
      const res = await resetPassword(token, data.password);
      if (!res.status) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
        style: TOAST_STYLE.success,
      });

      setTimeout(() => {
        // Redirect to login page after a short delay
        router.push("/");
      }, 1000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        style: TOAST_STYLE.error,
      });
    },
  });

  const onSubmit: SubmitHandler<NewPasswordData> = useCallback(
    (data) => {
      if (!token) {
        console.error("Token is required for password reset");
        return;
      }
      mutateAsync(data);
    },
    [token],
  );

  return (
    <>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="flex flex-col lg:gap-6 gap-4"
        >
          <Controller
            name="password"
            control={method.control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            render={({ field }) => (
              <div className="input-wrapper">
                <div className="relative">
                  <TextField.Root
                    {...field}
                    placeholder="New Password"
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  {/* Show password visibility */}
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  >
                    {isPasswordVisible ? (
                      <EyeIcon size={20} />
                    ) : (
                      <EyeClosed size={20} />
                    )}
                  </button>
                </div>
                {method.formState.errors.password && (
                  <p className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.password.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="confirmPassword"
            control={method.control}
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === method.getValues("password") ||
                "Passwords do not match",
            }}
            render={({ field }) => (
              <div className="input-wrapper">
                <div className="relative">
                  <TextField.Root
                    {...field}
                    placeholder="Confirm Password"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                  />
                  {/* Show confirm password visibility */}
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeIcon size={20} />
                    ) : (
                      <EyeClosed size={20} />
                    )}
                  </button>
                </div>
                {method.formState.errors.confirmPassword && (
                  <p className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.confirmPassword.message}
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
    </>
  );
}
