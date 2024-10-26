import React from "react"
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import getRole from "@/lib/utils";
const TeacherPage = async () => {
  const {currentUserId, role} = await getRole();
  return ( <div className="flex-1 flex p-4 gap-4 flex-col xl:flex-row">
    {/* Left */}
    <div className="w-full xl:w-2/3">
      <div className="h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule (4A)</h1>
        <BigCalendarContainer type="teacherId" id={currentUserId!} />
      </div>
    </div>
    {/* Right */}
    <div className="w-full xl:w-1/3">
    <Announcements />
    </div>
  </div> );
}

export default TeacherPage;