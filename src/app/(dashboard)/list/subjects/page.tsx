
import React from "react";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data";
import { Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormModal from "@/components/FormModal";
import FormContainer from "@/components/FormContainer";
type SubjectList = Subject & {teachers: Teacher[]}
const columns = [
    {
        header: "Subject Name",
        accessor: "name",
    },
    {
        header: "Teachers",
        accessor: "teachers",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions"
    }
];
const renderRow = (item: SubjectList)=>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-uPurple">
        <td className="flex items-center gap-4 p-4">{item.name}</td>
        <td className="hidden md:table-cell">{item.teachers.map((teacher)=>teacher.name).join(", ")}</td>
        {role === "admin" &&  <td>
           <div className="flex items-center gap-2">
           <FormContainer table="subject" type="update" data={item} />
           <FormContainer table="subject" type="delete" id={item.id} />
            </div>
        </td>}
    </tr>
)
const SubjectListPage = async ({searchParams}: {searchParams: {[key: string]: string} | undefined}) => {
    // @ts-ignore
    const {page, ...queryParams} = searchParams;
    const p = page ? parseInt(page) : 1;
    // URL Params Condition
    const query: Prisma.SubjectWhereInput = {};
    if(queryParams){
        for(const [key, value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
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
        prisma.subject.findMany({
            where: query,
            include:{
                teachers: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.subject.count({where: query})
    ])
    return ( <div className="bg-white p-4 flex-1 rounded-md m-4">
        {/* Top */}
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold hidden md:block">All Subjects</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <TableSearch />
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-uYellow">
                        <Image src={"/filter.png"} alt="" width={14} height={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-uYellow">
                        <Image src={"/sort.png"} alt="" width={14} height={14} />
                    </button>
                    {role === "admin" && (<FormContainer table="subject" type="create" />)}
                </div>
            </div>
        </div>
        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* Pagination */}
        <Pagination page={p} count={count} />
    </div> );
}

export default SubjectListPage;