import { Button } from "@/components/ui/button";
import Header from "./_header";
import Link from "next/link";
import { Medal } from "lucide-react";
import Footer from "./_footer";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <main className="h-[84vh] flex justify-center items-center">
        <div className=" h-full max-w-4xl flex flex-col justify-center gap-y-6 items-center">
          <div className="flex gap-x-3 items-center text-amber-900 bg-amber-300 px-6 py-3 rounded-full">
            <Medal strokeWidth={2} />
            <span className="uppercase  text-sm font-semibold">
              NO 1 task management
            </span>
          </div>
          <h1 className="text-6xl font-bold">Trello Clone helps team move</h1>
          <h2 className=" bg-gradient-to-r from-red-700 to-orange-600 py-3 px-6 rounded-md text-6xl font-bold text-white">
            work forword
          </h2>
          <p className="text-2xl font-medium text-center text-gray-400">
            Collaborate, manage projects and react new productivity peaks. From
            high rises to home office, the way your team work is unique -
            accomplish it all with Trello
          </p>
          <Button size="lg" asChild>
            <Link href="#">Get Trello for free</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
