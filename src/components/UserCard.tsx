import prisma from "@/lib/prisma";
import Image from "next/image";

interface UserCardProps{
  type: "admin" | "teacher" | "student" | "parent";
}
const UserCard = async ({type}: UserCardProps) => {
  const modeMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  }
  const data = await modeMap[type].count();
  return ( <div className="rounded-2xl odd:bg-uPurple even:bg-uYellow p-4 flex-1 min-w-[130px]">
    <div className="flex justify-between items-center">
      <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
      <Image src="/more.png" className="text-2xl font-semibold my-4" alt="" width={20} height={20} />
    </div>
    <h1 className="text-2xl font-semibold my-4">{data}</h1>
    <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
  </div> );
}

export default UserCard;