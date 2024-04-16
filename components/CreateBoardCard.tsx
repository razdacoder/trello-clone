import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function CreateBoardCard() {
  return (
    <Button
      variant="secondary"
      className="w-48 h-28 flex justify-center items-center"
    >
      <Plus className="size-8" />
    </Button>
  );
}
