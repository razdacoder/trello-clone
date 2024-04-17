"use server";

import { db } from "@/db";
import { WorkSpaceTable } from "@/db/schema";
import { lucia, validateRequest } from "@/lib/auth";
import { workspaceSchema } from "@/types/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

type FormState = {
  success?: boolean;
  error?: boolean;
  message: string;
};

export const getUserWorkspaces = async () => {
  const { user } = await validateRequest();
  if (!user?.id) {
    throw new Error("Unauthorized");
  }
  const workspaces = await db.query.WorkSpaceTable.findMany({
    where: eq(WorkSpaceTable.ownerId, user.id),
  });
  return workspaces;
};

export const createUserWorkspace = async (
  values: z.infer<typeof workspaceSchema>
): Promise<FormState> => {
  try {
    const { user } = await validateRequest();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }
    const parsed = workspaceSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error("Invalid from data");
    }

    await db
      .insert(WorkSpaceTable)
      .values({ name: values.name, ownerId: user.id });

    return {
      success: true,
      message: "Workspace created successfully",
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      error: true,
      message: e.message,
    };
  }
};
