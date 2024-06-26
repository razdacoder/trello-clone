import Link from "next/link";
import Logo from "@/components/Logo";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import ForgotPasswordForm from "./forgot-password-form";

export default async function ForgotPasswordPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className=" text-balance text-muted-foreground">
              Enter your email to reset your password
            </p>
          </div>
          <ForgotPasswordForm />
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
