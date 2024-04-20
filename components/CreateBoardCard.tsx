"use client";
import { Globe, Lock, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { boardSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { getUserWorkspaces } from "@/actions/workspace.action";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
  "/images/bg5.jpg",
  "/images/bg6.jpg",
  "/images/bg7.jpg",
  "/images/bg8.jpg",
  "/images/bg9.jpg",
  "/images/bg10.jpg",
];
export default function CreateBoardCard() {
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ["getAllWorkspaces"],
    queryFn: () => getUserWorkspaces(),
  });
  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
      visibility: "Private",
      imageUrl: "",
      workspaceId: isLoading ? "" : workspaces![0].id,
    },
  });
  const [open, setOpen] = useState(false);
  const openChange = (value: boolean) => {
    setOpen(value);
    form.reset();
  };

  async function onSubmit(values: z.infer<typeof boardSchema>) {}

  const { isSubmitting } = form.formState;
  return (
    <Popover open={open} onOpenChange={openChange}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="w-48 h-28 flex justify-center flex-col gap-2 items-center"
        >
          <Plus className="size-8" />
          Create new board
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-[350px] text-muted-foreground">
        <div>
          <h4 className="text-center text-sm font-medium">Create board</h4>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Background</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-5 space-x-3"
                    >
                      {images.map((image) => (
                        <FormItem key={image} className="w-full relative h-24">
                          <FormControl>
                            <RadioGroupItem value={image} className="hidden" />
                          </FormControl>
                          {/* <FormLabel className="font-normal"> */}
                          <Image src={image} alt={image} fill />
                          {/* </FormLabel> */}
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Board title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="workspaceId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workspace" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workspaces?.map((workspace) => (
                        <SelectItem key={workspace.id} value={workspace.id}>
                          {workspace.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="visibility"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Private">
                        <div className="flex flex-row items-center gap-x-3">
                          <Lock className="size-4" />
                          <span className="text-sm font-medium">Private</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Public">
                        <div className="flex flex-row items-center gap-x-3">
                          <Globe className="size-4" />
                          <span className="text-sm font-medium">Public</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton isLoading={isSubmitting}>Create</LoadingButton>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
