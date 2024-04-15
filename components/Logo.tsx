import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-x-1">
      <Image src="/logo.svg" alt="Logo" width={48} height={48} />
      <span className="text-2xl font-bold">Trello</span>
    </div>
  );
}
