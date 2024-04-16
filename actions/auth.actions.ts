"use server";

import { registerSchema } from "@/types/schema";
import { z } from "zod";
import * as argon2 from "argon2";
import { generateId } from "lucia";
import { db } from "@/db";
import { EmailVerificationTable, UserTable } from "@/db/schema";
import * as jose from "jose";
import { and, eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export type FormState = {
  success?: boolean;
  error?: boolean;
  message: string;
};
export const registerUser = async (
  values: z.infer<typeof registerSchema>
): Promise<FormState> => {
  try {
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error("Invalid form data");
    }
    const isExitingUser = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, values.email as string),
    });
    if (isExitingUser) {
      throw new Error("Email already exist!");
    }
    const hashedPassword = await argon2.hash(values.password as string);
    const userId = generateId(15);
    await db.insert(UserTable).values({
      id: userId,
      email: values.email as string,
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      hashedPassword: hashedPassword,
    });

    const code = Math.random().toString(36).substring(2, 8);

    await db.insert(EmailVerificationTable).values({
      code: code,
      userId: userId,
    });
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

    const token = await new jose.SignJWT({
      userId: userId,
      code,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("trello_clone")
      .setAudience("trello_clone")
      .setExpirationTime("5m")
      .sign(secret);
    const url = `${process.env.NEXT_PUBLIC_URL}/verify-email/?token=${token}`;
    console.log(url);
    return {
      success: true,
      message: "Check your email for verification.",
    };
  } catch (e: any) {
    console.log(e.message);

    return { error: true, message: e.message };
  }
};

const createSessionAction = async (userId: string) => {
  const session = await lucia.createSession(userId, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const verifyEmail = async (token: string): Promise<FormState> => {
  try {
    // verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: "trello_clone", // issuer
      audience: "trello_clone", // audience
    });
    const emailVerifyQueryRes = await db.query.EmailVerificationTable.findFirst(
      {
        where: and(
          eq(EmailVerificationTable.userId, payload.userId as string),
          eq(EmailVerificationTable.code, payload.code as string)
        ),
      }
    );
    if (!emailVerifyQueryRes) {
      throw new Error("Invalid token, please try again.");
    }

    await db
      .update(UserTable)
      .set({ isEmailVerified: true })
      .where(eq(UserTable.id, emailVerifyQueryRes.userId));
    await db
      .delete(EmailVerificationTable)
      .where(eq(EmailVerificationTable.id, emailVerifyQueryRes.id));

    await createSessionAction(payload.userId as string);

    return {
      success: true,
      message: "Email Verified successfully",
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      error: true,
      message: "Invalid token, Please try again.",
    };
  }
};
