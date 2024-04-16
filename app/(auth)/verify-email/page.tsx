import Logo from "@/components/Logo";
import VerifyEmailForm from "./verify-email-form";

export default async function VerifyPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <VerifyEmailForm />
      </div>

      <div className="hidden bg-muted lg:grid place-items-center">
        <Logo />
      </div>
    </div>
  );
}
