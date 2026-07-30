"use client";

import { useForm } from "react-hook-form";
import styles from "../module/common.module.css";
import { useAppSelector } from "../hooks/useAppSelector";
import Spinner from "../components/Spinner";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { resetPasswordAsync } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

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
            <label className="text-black font-bold">New Password</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
                },
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-black font-bold">Confirm Password</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Confirm Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
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
