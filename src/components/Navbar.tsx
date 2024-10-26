

import Image from "next/image";
import CustomUserButton from "./UserButton";
import { currentUser } from "@clerk/nextjs/server";

const NavBar = async () => {
  const user = await currentUser();
  return ( <div className="flex items-center justify-between p-4 bg-white">
    {/* SEARCH BAR */}
    <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src={'/search.png'} alt="search" width={14} height={14} />
      <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
    </div>
    {/* ICON AND USER */}
    <div className="flex items-center gap-6 justify-end w-full">
    <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer border-b shadow-lg shadow-black/90">
        <Image src="/lamp.png" alt="Lamp" width={20} height={20} />
      </div>
      <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
        <Image src="/message.png" alt="" width={20} height={20} />
      </div>
      <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
        <Image src="/announcement.png" alt="" width={20} height={20} />
        <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>
      </div>
      <div className="flex flex-col cursor-pointer">
        <span className="text-xs leading-3 font-medium">{user?.fullName || "UnIdentified Creature"}</span>
        <span className="text-[10px] text-gray-500 text-right">{user?.publicMetadata?.role as string}</span>
      </div>
      {/* <Image className="rounded-full cursor-pointer" src={'/avatar.png'} alt="" width={36} height={36} /> */}
    <CustomUserButton />
    </div>
  </div> );
}

export default NavBar;