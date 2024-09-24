import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  email: z.string().min(1, { message: "Email is required!" }).email({ message: "Please provide a valid email!" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long!" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long!" }),
});

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required!" }).email({ message: "Please provide a valid email!" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long!" }),
});
