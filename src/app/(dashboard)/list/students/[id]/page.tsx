import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
    return (<>
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
            {/* Left */}
            <div className="w-full xl:w-2/3">
                {/* Top */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* User Info Card */}
                    <div className="bg-uSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                        <Image src={"/upgraderboy.jpeg"} alt="" width={144} height={144} className="w-36 h-36 rounded-full object-cover" />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                        <h1 className="text-xl font-semibold">Lorem ipsum dolor sit.</h1>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, possimus!</p>
                            <div className="flex items-center jusitfy-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src={"/blood.png"} alt="" width={14} height={14} />
                                    <span>A+</span>
                                </div>
                                <div className="w-full md:1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src={"/date.png"} alt="" width={14} height={14} />
                                    <span>10 Jan 2024</span>
                                </div>
                                <div className="w-full md:1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src={"/mail.png"} alt="" width={14} height={14} />
                                    <span>user@gmail.com</span>
                                </div>
                                <div className="w-full md:1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src={"/phone.png"} alt="" width={14} height={14} />
                                    <span>+1234 56789 12</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Small Card */}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        {/* Card */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image alt="" src={"/singleAttendance.png"} width={24}height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-400">Attendance</span>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image alt="" src={"/singleBranch.png"} width={24}height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">2</h1>
                                <span className="text-sm text-gray-400">Grade</span>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image alt="" src={"/singleLesson.png"} width={24}height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">4</h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image alt="" src={"/singleClass.png"} width={24}height={24} className="w-6 h-6" />
                            <div className="">
                                <h1 className="text-xl font-semibold">6</h1>
                                <span className="text-sm text-gray-400">Class</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Student&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* Right */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold">Shortcuts</h1>
                <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-">
                    <Link className="p-3 rounded-md bg-uSkyLight" href={`/list/lessons?classId=${2}`}>Student&apos;s Lessons</Link>
                    <Link className="p-3 rounded-md bg-uPurple" href={`/list/teachers?classId=${2}`}>Student&apos;s Teachers</Link>
                    <Link className="p-3 rounded-md bg-pink-50" href={`/list/exams?classId=${2}`}>Student&apos;s Exams</Link>
                    <Link className="p-3 rounded-md bg-uSkyLight" href={`/list/assignments?classId=${2}`}>Student&apos;s Assignments</Link>
                    <Link className="p-3 rounded-md bg-uYellowLight" href={`/list/results?studentId=${"student2"}`}>Student&apos;s Results</Link>
                </div>
            </div>
            <Performance />
            <Announcements />
            </div>
        </div>
    </>);
}

export default SingleStudentPage;