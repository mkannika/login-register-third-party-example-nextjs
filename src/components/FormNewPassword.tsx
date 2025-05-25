"use client";

import { TextField } from "@radix-ui/themes/components/index";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type NewPasswordData = {
  password: string;
  confirmPassword: string;
};

export default function FormNewPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const method = useForm<NewPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<NewPasswordData> = (data) => console.log(data);

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
            <button type="submit" className="hover:opacity-75">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
