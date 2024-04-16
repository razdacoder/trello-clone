"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  CircuitBoard,
  Menu,
  Plus,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import { Badge } from "./ui/badge";
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

export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
          >
            <CircuitBoard className="h-4 w-4" />
            Boards
          </Link>
          <Separator />
          <h4 className="text-muted-foreground px-3 py-2 mt-2">Workspaces</h4>
          <Accordion
            type="single"
            collapsible
            className="w-full px-3 py-2 text-muted-foreground"
          >
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-x-2">
                  <Workflow className="size-4" />
                  Trello Workspace
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
          </Accordion>
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
