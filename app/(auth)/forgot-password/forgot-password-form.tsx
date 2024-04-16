"use client";
import { resetPassword } from "@/actions/auth.actions";
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
import { resetPasswordSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const res = await resetPassword(values);
    if (res.success) {
      toast({
        title: "Email sent",
        description: res.message,
      });
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
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
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
