"use client";

import LoginThirdParty from "@/components/LoginThirdParty";
import { toast } from "@/hooks/use-toast";
import { loginEmailPassword } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import { TOAST_STYLE } from "@/styles/toast.style";
import { Checkbox } from "@radix-ui/react-checkbox";
import { TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import SubmitButton from "./SubmitButton";

type LoginData = {
  email: string;
  password: string;
  remember_me: boolean;
};

export default function FormLogin() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const method = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await loginEmailPassword({
        email: data.email,
        password: data.password,
      });
      if (!res.status) {
        toast({
          title: "Error",
          description: res.message,
          style: TOAST_STYLE.error,
        });
        return;
      }

      // Set user in the auth store
      setUser({
        email: res.data.email,
        name: res.data.name,
        photoURL: res.data.photoURL || "",
      });
      toast({
        title: "Success",
        description: "Login successful",
        style: TOAST_STYLE.success,
      });

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    },
  });

  const onSubmit: SubmitHandler<LoginData> = useCallback(
    (data) => {
      mutateAsync(data);
    },
    [mutateAsync],
  );

  // Use useEffect for navigation side-effect
  useEffect(() => {
    if (user) {
      router.push("/profile");
      return; // Prevent further execution
    }
  }, [user, router]);

  return (
    <>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
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
                <TextField.Root {...field} placeholder="Email" type="email" />
                {method.formState.errors.email && (
                  <div className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.email.message}
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            name="password"
            control={method.control}
            rules={{
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: "Invalid password",
              },
            }}
            render={({ field }) => (
              <div className="input-wrapper">
                <TextField.Root
                  {...field}
                  placeholder="Password"
                  type="password"
                />
                {method.formState.errors.password && (
                  <div className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.password.message}
                  </div>
                )}
              </div>
            )}
          />
          <div className="flex justify-between items-center">
            <Controller
              name="remember_me"
              control={method.control}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-[#313131] text-sm font-medium">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={clsx(
                      "w-4 h-4 border border-gray-300 rounded",
                      // Checkbox styles
                      field.value
                        ? "bg-[#FF8682] border-transparent focus:ring-2 focus:ring-[#FF8682] focus:ring-offset-2"
                        : "bg-white",
                    )}
                  />
                  Remember me
                </label>
              )}
            />
            <Link
              className="text-sm font-medium text-[#FF8682] hover:underline"
              href={"/forgot-password"}
            >
              Forgot Password
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-4 flex-col">
            <SubmitButton isPending={isPending} />
            <div className="text-sm font-medium">
              Don’t have an account?{" "}
              <Link href="signup" className="text-[#FF8682] hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
      <LoginThirdParty />
    </>
  );
}
