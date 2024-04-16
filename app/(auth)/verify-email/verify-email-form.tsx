"use client";
import { verifyEmail } from "@/actions/auth.actions";
import LoadingButton from "@/components/LoadingButton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error">();

  const onVerify = async () => {
    setIsLoading(true);
    const { success, error, message } = await verifyEmail(
      searchParams.get("token")!
    );
    if (success) {
      setStatus("success");
      setIsLoading(false);
      return router.push("/dashboard");
    } else if (error) {
      setStatus("error");
      setMessage(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <h4 className="text-2xl font-semibold text-center">Verity Email</h4>
      <Button
        size="lg"
        onClick={onVerify}
        disabled={isLoading}
        className="flex gap-x-3 items-center"
      >
        {isLoading && <Loader2 className="size-4 animate-spin text-white" />}
        Verify Email
      </Button>
      {status === "error" && (
        <>
          <Alert
            variant="destructive"
            className="bg-red-500 text-white text-center"
          >
            <AlertTitle className="normal-case">{message}</AlertTitle>
          </Alert>
        </>
      )}
      <Button asChild variant="link" className="text-primary dark:text-white">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
