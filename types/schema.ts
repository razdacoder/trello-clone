import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "First name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
});

export const resetPasswordConfirmSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const workspaceSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
});

export const boardSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  workspaceId: z.string(),
  visibility: z.enum(["Private", "Public"]),
  imageUrl: z.string().min(1, { message: "Background is required" }),
});
