import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className=" h-[8vh] px-12 py-2 shadow-md border-b flex justify-between items-center">
      <Logo />
      <nav className="flex gap-x-6 items-center ">
        <Button
          variant="outline"
          size="lg"
          className="text-primary border-primary border-2"
          asChild
        >
          <Link href="#">Login</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="#">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}
