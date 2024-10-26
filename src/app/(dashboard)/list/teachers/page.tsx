
import React from "react";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { role, teachersData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormContainer from "@/components/FormContainer";

type TeacherList = Teacher & {subjects: Subject[]} & {classes: Class[]};
const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Teacher ID",
        accessor: "teacherId",
        className: "hidden md:table-cell",
    },
    {
        header: "Subjects",
        accessor: "subjects",
        className: "hidden md:table-cell",
    },
    {
        header: "Classes",
        accessor: "classes",
        className: "hidden md:table-cell",
    },
    {
        header: "Phone",
        accessor: "phone",
        className: "hidden lg:table-cell",
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden lg:table-cell",
    },
    ...(role === "admin" ? [{
        header: "Actions",
        accessor: "actions"
    }] : [])
];
const renderRow = (item: TeacherList)=>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-uPurple">
        <td className="flex items-center gap-4 p-4">
            <Image src={item.img || "/mrTeacher.png"} alt="" width={40} height={40} className="w-10 h-10 md:hidden xl:block rounded-full object-cover" />
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-xs text-gray-500">{item?.email}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.username}</td>
        <td className="hidden md:table-cell">{item.subjects.map(subject=>subject.name).join(", ")}</td>
        <td className="hidden md:table-cell">{item.classes.map(classItem=>classItem.name).join(", ")}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link href={`/list/teachers/${item.id}`}>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-uSky">
                    <Image src={"/view.png"} alt="" width={16} height={16} />
                </button>
                </Link>
                {role === "admin" &&
                // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-uPurple">
                //     <Image src={"/delete.png"} alt="" width={16} height={16} />
                // </button>
                <>
                <FormContainer table="teacher" type="update" data={item} />
                <FormContainer table="teacher" type="delete" id={item.id} />
                </>
                }
            </div>
        </td>
    </tr>
)
const TeacherListPage = async ({searchParams}: {searchParams: {[key: string]: string} | undefined}) => {
    // @ts-ignore
    const {page, ...queryParams} = searchParams;
    const p = page ? parseInt(page) : 1;
    // URL Params Condition
    const query: Prisma.TeacherWhereInput = {};
    if(queryParams){
        for(const [key, value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "classId": {
                        query.lessons = {
                            some: {
                                classId: parseInt(queryParams.classId!),
                            }
                        }
                    };
                    break;
                    case "search":
                        query.name = {
                            contains: value,
                            mode: "insensitive"
                        }
                    break;
                    default:
                        break;
                }
            }
        }
    }
    console.log(searchParams);
    const [data, count] = await prisma.$transaction([
        prisma.teacher.findMany({
            where: query,
            include:{
                subjects: true,
                classes: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.teacher.count({where: query})
    ])
    // console.log(data);
    return ( <div className="bg-white p-4 flex-1 rounded-md m-4">
        {/* Top */}
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold hidden md:block">All Teachers</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <TableSearch />
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-uYellow">
                        <Image src={"/filter.png"} alt="" width={14} height={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-uYellow">
                        <Image src={"/sort.png"} alt="" width={14} height={14} />
                    </button>
                    {role === "admin" && (
                        // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-uYellow">
                        //     <Image src={"/plus.png"} alt="" width={14} height={14} />
                        // </button>
                        <FormContainer table="teacher" type="create" />
                    )}
                </div>
            </div>
        </div>
        <Pagination page={p} count={count} />
        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* Pagination */}
    </div> );
}

export default TeacherListPage;