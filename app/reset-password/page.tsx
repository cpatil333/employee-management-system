"use client";

import { useForm } from "react-hook-form";
import styles from "../module/common.module.css";
import { useAppSelector } from "../hooks/useAppSelector";
import Spinner from "../components/ui/Spinner";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { resetPasswordAsync } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../components/ui/Input";
import { authValidation } from "../validation/authValidation";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
  token: string | null;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  if (!token) {
    toast.error("Reset token is missing.");
    return;
  }
  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      const resultAction = await dispatch(
        resetPasswordAsync({ token, password: data.password }),
      );

      if (
        resetPasswordAsync.fulfilled.match(resultAction) &&
        resultAction.payload
      )
        toast.success("Password updated successfully!");
      router.push("/login");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Something went wrong!");
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen bg-gray-500 items-center justify-center">
      <div className="w-full max-w-md bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl md:text-xl text-black font-bold mb-6 text-center">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="New Password"
              type="password"
              placeholder="Enter Password"
              error={errors.password?.message}
              {...register("password", authValidation.password)}
            />
          </div>
          <div>
            <Input
              type="password"
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
            />
          </div>
          <div>
            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
              id="btnsubmit"
              type="submit"
            >
              {loading ? "Passoword updated..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
