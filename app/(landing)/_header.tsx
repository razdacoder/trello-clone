import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className=" h-[8vh] px-12 py-2 shadow-md border-b flex justify-between items-center">
      <Logo />
      <nav className="flex gap-x-6 items-center ">
        <ThemeToggle />
        <Button
          variant="outline"
          size="lg"
          className="text-primary border-primary border-2 hover:text-primary hover:opacity-90"
          asChild
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="/register">Get Trello for free</Link>
        </Button>
      </nav>
    </header>
  );
}
