"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { workspaceSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import LoadingButton from "./LoadingButton";
import { createUserWorkspace } from "@/actions/workspace.action";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  setOpen?: (value: boolean) => void;
};

export default function CreateWorkspaceModal({ open, setOpen }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(values: z.infer<typeof workspaceSchema>) {
    const res = await createUserWorkspace(values);
    if (res.success) {
      toast({
        title: res.message,
      });

      if (setOpen) {
        setOpen(false);
      }
      queryClient.invalidateQueries({ queryKey: ["getAllWorkspaces"] });
      router.refresh();
    } else if (res.error) {
      toast({
        variant: "destructive",
        title: "Error!!",
        description: res.message,
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="icon" className="hover:no-underline">
          <Plus className="size-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            You currently do not have any workspace to work. create one below.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input placeholder="My workspace" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <LoadingButton isLoading={isSubmitting}>
                Create workspace
              </LoadingButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
