import Link from "next/link";
import Logo from "@/components/Logo";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import ResetPasswordForm from "./reset-password-form";

export default async function ResetPasswordPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className=" text-balance text-muted-foreground">
              Enter your new password
            </p>
          </div>
          <ResetPasswordForm />
          <div className="mt-4 text-center text-sm">
            Remember Password?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:grid place-items-center">
        <Logo />
      </div>
    </div>
  );
}
