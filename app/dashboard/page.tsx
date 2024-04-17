import BoardCard from "@/components/BoardCard";
import CreateBoardCard from "@/components/CreateBoardCard";
import { validateRequest } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex justify-center my-6">
      <div className="max-w-7xl">
        <h3 className="text-2xl font-semibold my-5">All Boards</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />

          <CreateBoardCard />
        </div>
      </div>
    </div>
  );
}
