"use client";
import { resetPasswordConfirm } from "@/actions/auth.actions";
import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { resetPasswordConfirmSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordConfirmSchema>>({
    resolver: zodResolver(resetPasswordConfirmSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const token = searchParams.get("token");

  async function onSubmit(values: z.infer<typeof resetPasswordConfirmSchema>) {
    const res = await resetPasswordConfirm(values, token!);
    if (res.success) {
      toast({
        description: res.message,
      });
      router.push("/login");
    } else if (res.error) {
      toast({
        title: "Error!!",
        description: res.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="..........."
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="confirm_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="..........."
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <LoadingButton isLoading={isSubmitting}>Reset Password</LoadingButton>
        </div>
      </form>
    </Form>
  );
}
