import Image from "next/image";
import Link from "next/link";

export default function BoardCard() {
  return (
    <Link href="#">
      <div className=" w-48 h-28 relative rounded-md py-3 px-3 group  transition-all">
        <Image
          src="/wallpaper.jpg"
          alt="Board Image"
          fill
          className="absolute -z-10 rounded-md group-hover:opacity-80 transition-all"
          objectFit="cover"
        />
        <h4 className="font-semibold text-sm truncate">Hass Capital</h4>
      </div>
    </Link>
  );
}
