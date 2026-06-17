import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password too short"),
});

export const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Invalid phone number"),
    password: z.string().min(12, "Password must be at least 12 characters"),
    confirmPassword: z.string(),
    role: z.enum(["RIDER", "DRIVER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
