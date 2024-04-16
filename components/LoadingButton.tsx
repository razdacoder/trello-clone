import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  children: ReactNode;
  isLoading: boolean;
};

export default function LoadingButton({ children, isLoading }: Props) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full flex gap-x-3 items-center"
    >
      {isLoading && <Loader2 className="size-4 text-white animate-spin" />}
      {children}
    </Button>
  );
}
