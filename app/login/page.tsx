"use client";

import { useForm } from "react-hook-form";
import { LoginType } from "../types/logintypes";
import styles from "../module/common.module.css";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchLoginAsyc } from "../features/login/loginSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    try {
      const resultAction = await dispatch(fetchLoginAsyc(data));
      // console.log(resultAction);
      if (
        fetchLoginAsyc.fulfilled.match(resultAction) &&
        resultAction.payload
      ) {
        toast.success("Login successfully!");
        reset();
        router.push("/admin");
      } else {
        toast.error("Invalid email or password");
      }
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        throw new Error("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-500 items-center justify-center">
      <div className="w-full max-w-md bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl md:text-xl text-black font-bold mb-6 text-center">
          Employee Management System
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-black font-bold">Email</label>
            <input
              id="email"
              type="email"
              className={styles.formInput}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-black font-bold">Password</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <div>
            <button
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
              id="btnsubmit"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
