"use client";

import { useForm } from "react-hook-form";
import { useAppSelector } from "../hooks/useAppSelector";
import Spinner from "../components/ui/Spinner";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { forgotPasswordAsync } from "../features/auth/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import { authValidation } from "../validation/authValidation";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const resultAction = await dispatch(forgotPasswordAsync(data.email));
      if (
        forgotPasswordAsync.fulfilled.match(resultAction) &&
        resultAction.payload
      ) {
        reset();
        toast.success("Reset link generated");
        router.push(`/reset-password?token=${resultAction.payload.token}`);
      } else {
        toast.error("Invalid email");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        throw new Error("Something went wrong!");
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
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              error={errors.email?.message}
              {...register("email", authValidation.email)}
            />
          </div>
          <div>
            <button
              onClick={() => router.push("/login")}
              className="w-50 text-xl text-blue-600 p-2 rounded cursor-pointer "
            >
              Back to Login
            </button>
            <button
              disabled={loading}
              className="w-50 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
              id="btnsubmit"
              type="submit"
            >
              {loading ? "Sending Reset Link..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
