"use client";

import { toast } from "@/hooks/use-toast";
import { register } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import { TOAST_STYLE } from "@/styles/toast.style";
import { Checkbox } from "@radix-ui/react-checkbox";
import { TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormDivider from "./FormDivider";
import RegisterThirdParty from "./RegisterThirdParty";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
  agree: boolean;
};

export default function FormRegister() {
  const router = useRouter();
  // Only subscribe to setUser action
  const setUser = useAuthStore((state) => state.setUser);

  const method = useForm<RegisterData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
      agree: false,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await register({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      });
      if (!res.status) {
        toast({
          title: "Error",
          description: res.message,
          style: TOAST_STYLE.error,
        });
      } else {
        // Handle successful registration, e.g., redirect or show success message
        toast({
          title: "Success",
          description: "Registration successful!",
          style: TOAST_STYLE.success,
        });
        method.reset();

        // Set user data in the store
        setUser({
          email: res.data.email,
          name: res.data.name || "Unknown User",
          photoURL: res.data.photoURL || "",
        });
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      }
    },
  });

  const onSubmit: SubmitHandler<RegisterData> = useCallback(
    (data) => mutateAsync(data),
    [mutateAsync],
  );

  return (
    <>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="flex flex-col sm:gap-6 gap-4"
        >
          <div className="grid grid-cols-2 sm:gap-6 gap-4">
            <Controller
              name="firstName"
              control={method.control}
              rules={{
                required: "First name is required",
                pattern: { value: /^[A-Za-z]+$/, message: "Invalid name" },
              }}
              render={({ field }) => (
                <div className="input-wrapper">
                  <TextField.Root
                    {...field}
                    placeholder="First Name"
                    type="text"
                  />
                  {method.formState.errors.firstName && (
                    <p className="text-[#FF8682] text-sm mt-1">
                      {method.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="lastName"
              control={method.control}
              rules={{
                required: "Last name is required",
                pattern: { value: /^[A-Za-z]+$/, message: "Invalid name" },
              }}
              render={({ field }) => (
                <div className="input-wrapper">
                  <TextField.Root
                    {...field}
                    placeholder="Last Name"
                    type="text"
                  />
                  {method.formState.errors.lastName && (
                    <p className="text-[#FF8682] text-sm mt-1">
                      {method.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:gap-6 gap-4">
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
                    <p className="text-[#FF8682] text-sm mt-1">
                      {method.formState.errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

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
                  <p className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.password.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="confirm_password"
            control={method.control}
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === method.getValues("password") ||
                "Passwords do not match",
            }}
            render={({ field }) => (
              <div className="input-wrapper">
                <TextField.Root
                  {...field}
                  placeholder="Confirm Password"
                  type="password"
                />
                {method.formState.errors.confirm_password && (
                  <p className="text-[#FF8682] text-sm mt-1">
                    {method.formState.errors.confirm_password.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex justify-between items-center">
            <Controller
              name="agree"
              control={method.control}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-[#313131] text-sm font-medium">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  I agree to all the{" "}
                  <Link
                    className="text-sm font-medium text-[#FF8682] hover:underline"
                    href="/terms"
                  >
                    Terms
                  </Link>
                  <span> and </span>
                  <Link
                    className="text-sm font-medium text-[#FF8682] hover:underline"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </label>
              )}
            />
          </div>
          <div className="mt-6 flex items-center gap-4 flex-col">
            <button
              type="submit"
              className="hover:opacity-75"
              disabled={isPending}
            >
              {isPending ? (
                <LoaderIcon className="animate-spin" aria-label="Loading" />
              ) : null}
              Submit
            </button>
            <p className="text-sm font-medium">
              Already have an account?{" "}
              <Link href="/" className="text-[#FF8682] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
      <FormDivider />
      <RegisterThirdParty />
    </>
  );
}
