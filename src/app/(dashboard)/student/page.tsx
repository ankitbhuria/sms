import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import prisma from "@/lib/prisma";
import getRole from "@/lib/utils";
import React from "react"
const StudentPage = async ({searchParams}: {searchParams: {[key: string]: string | undefined}}) => {
  const {currentUserId, role} = await getRole();
  const classItem = await prisma.class.findMany({
    where: {
      students: {
        some: {
          id: currentUserId!
        }
      }
    }
  })
  return ( <div className="p-4 flex gap-4 flex-col xl:flex-row">
    {/* Left */}
    <div className="w-full xl:w-2/3">
      <div className="h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule (4A)</h1>
        <BigCalendarContainer type="classId" id={classItem[0].id} />
      </div>
    </div>
    {/* Right */}
    <div className="w-full xl:w-1/3">
    <EventCalendarContainer searchParams={searchParams} />
    <Announcements />
    </div>
  </div> );
}

export default StudentPage;