"use client";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";
import {
  Bell,
  CircuitBoard,
  Plus,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { getUserWorkspaces } from "@/actions/workspace.action";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export default function Sidebar() {
  const { id } = useParams();
  const pathname = usePathname();
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ["getAllWorkspaces"],
    queryFn: () => getUserWorkspaces(),
  });

  const [open, setOpen] = useState(false);
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo />
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
            >
              <CircuitBoard className="h-4 w-4" />
              Boards
            </Link>
            <Separator />
            <div className="flex justify-between items-center">
              <h4 className="text-muted-foreground px-3 py-2 mt-2">
                Workspaces
              </h4>
              <CreateWorkspaceModal
                open={open}
                setOpen={(value) => setOpen(value)}
              />
            </div>

            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="w-full h-[30px] rounded-md" />
                <Skeleton className="w-full h-[30px] rounded-md" />
                <Skeleton className="w-full h-[30px] rounded-md" />
                <Skeleton className="w-full h-[30px] rounded-md" />
              </div>
            )}

            <Accordion
              type="single"
              collapsible
              className="w-full px-3 py-2 text-muted-foreground"
            >
              {workspaces?.map((workspace) => (
                <AccordionItem
                  key={workspace.id}
                  value={`item-${workspace.id}`}
                  className="border-b-0"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-x-2">
                      <Workflow className="size-4" />
                      {workspace.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href={`/dashboard/w/${workspace.id}/boards`}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        id == workspace.id &&
                          pathname.endsWith("/boards") &&
                          "text-primary"
                      )}
                    >
                      <CircuitBoard className="h-4 w-4" />
                      Boards
                    </Link>
                    <Button
                      variant="link"
                      className="flex w-full items-center justify-between rounded-lg hover:no-underline px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <div className="flex gap-3 items-center">
                        <Users className="h-4 w-4" />
                        Members
                      </div>
                      <Plus className="size-4" />
                    </Button>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
