import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="h-[8vh] px-12 py-2 shadow-md border-t flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-x-3 text-sm font-medium">
        <Link href="">Privacy & Policy</Link>
        <Link href="">Terms of service</Link>
      </div>
    </footer>
  );
}
