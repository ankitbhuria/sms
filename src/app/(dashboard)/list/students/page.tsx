import React from "react";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { role, studentsData, teachersData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Class, Prisma, Student } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

type StudentList = Student & {class: Class}
const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Student ID",
        accessor: "studentId",
        className: "hidden md:table-cell",
    },
    {
        header: "Grade",
        accessor: "grade",
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
const renderRow = (item: StudentList)=>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-uPurple">
        <td className="flex items-center gap-4 p-4">
            <Image src={item.img || "/mrStudent.png"} alt="" width={40} height={40} className="w-10 h-10 md:hidden xl:block rounded-full object-cover" />
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.class.name}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.username}</td>
        <td className="hidden md:table-cell">{item.class.name}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link href={`/list/students/${item.id}`}>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-uSky">
                    <Image src={"/view.png"} alt="" width={16} height={16} />
                </button>
                </Link>
                {role === "admin" &&
                // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-uPurple">
                //     <Image src={"/delete.png"} alt="" width={16} height={16} />
                // </button>
                <>
                <FormModal table="student" type="update" data={item} />
                <FormModal table="student" type="delete" id={item.id} />
                </>
                }
            </div>
        </td>
    </tr>
)
const StudentListPage = async ({searchParams}: {searchParams: {[key: string]: string} | undefined}) => {
    // @ts-ignore
    const {page, ...queryParams} = searchParams;
    const p = page ? parseInt(page) : 1;
    // URL Params Condition
    const query: Prisma.StudentWhereInput = {};
    if(queryParams){
        for(const [key, value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "teacherId": {
                        query.class = {
                            lessons: {
                                some: {
                                    teacherId: value,
                                }
                            }
                        }
                    };
                    break;
                    case "search":
                        query.name = {
                            contains: value,
                            mode: "insensitive"
                        }
                }
            }
        }
    }
    const [data, count] = await prisma.$transaction([
        prisma.student.findMany({
            where: query,
            include:{
                class: true
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.student.count({where: query})
    ])
    return ( <div className="bg-white p-4 flex-1 rounded-md m-4">
        {/* Top */}
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold hidden md:block">All Students</h1>
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
                        <FormModal table="student" type="create" />
                )}
                </div>
            </div>
        </div>
        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* Pagination */}
        <Pagination page={p} count={count} />
    </div> );
}

export default StudentListPage;