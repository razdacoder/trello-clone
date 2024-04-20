import { getWorksSpaceById } from "@/actions/workspace.action";
import BoardCard from "@/components/BoardCard";
import CreateBoardCard from "@/components/CreateBoardCard";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default async function WorkSpacePage({
  params,
}: {
  params: { id: string };
}) {
  const workspace = await getWorksSpaceById(params.id);
  return (
    <div className="w-[80%] mx-auto">
      <div className="flex justify-between items-center py-6 border-b-2">
        <div className="flex gap-x-3 items-center">
          <div className="font-semibold text-xl bg-primary w-12 h-12 flex justify-center items-center rounded-md shadow-2xl border-2">
            {workspace?.name.charAt(0)}
          </div>
          <h3 className="text-2xl font-semibold my-5">{workspace?.name}</h3>
        </div>
        <Button className="flex gap-x-3 items-center">
          <UserPlus className="size-4 " />
          Invite workspace members
        </Button>
      </div>
      <h3 className="text-2xl font-semibold my-5">Boards</h3>

      <div className="grid grid-cols-6 gap-4 my-6">
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />

        <CreateBoardCard />
      </div>
    </div>
  );
}
