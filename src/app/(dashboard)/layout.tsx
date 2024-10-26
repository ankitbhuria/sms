import Menu from "@/components/Menu";
import NavBar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";


interface DashboardProps{
  children: React.ReactNode;
}
const DashBoardLayout = ({children}: DashboardProps) => {
  return ( <div className="h-full flex bg-[#165be667]">
    {/* LEFT */}
    <div className="w-[14%] md:w[8%] lg:w-[16%] xl:w-[14%] p-4 bg-white">
      <Link href={'/'} className="flex items-center justify-center lg:justify-start gap-2">
      <Image src={'/logo.png'} alt={"Logo"} width={32} height={32} />
      <span className="hidden lg:block">SMS App</span></Link>
      <Menu />
    </div>
    {/* RIGHT */}
    <div className="w-[86%] md:[92%] lg:[84%] xl:w-[86%] overflow-scroll-y flex flex-col">
      <NavBar />
      {children}
    </div>
  </div> );
}

export default DashBoardLayout;