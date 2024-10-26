
import React from "react";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { Class, Prisma, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import getRole from "@/lib/utils";
import FormContainer from "@/components/FormContainer";
type ClassList = Class & { supervisor: Teacher }
const renderRow = async (item: ClassList) => {
    const { currentUserId, role } = await getRole();
    return (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-uPurple">
            <td className="flex items-center gap-4 p-4">{item.name}


            </td>
            <td className="hidden md:table-cell">{item.capacity}</td>
            <td className="hidden md:table-cell">{item.name[0]}</td>
            {item.supervisor ? <td className="hidden md:table-cell">{item.supervisor?.name + " " + item.supervisor?.surname}</td> : <td>Not Assigned</td>}
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-uSky">
                            <Image src={"/view.png"} alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        <>
                        <FormContainer table="class" type="update" data={item} />
                        <FormContainer table="class" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}
const ClassListPage = async ({
    searchParams,
}: { searchParams: { [key: string]: string | undefined }; }) => {
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;
    // URL Params Condition
    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "supervisorId":
                        query.supervisorId = value;
                        break;
                    case "search":
                        query.name = {
                            contains: value, mode: "insensitive"
                        };
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                supervisor: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.class.count({ where: query })
    ])
    const { currentUserId, role } = await getRole();
    const columns = [
        {
            header: "Class Name",
            accessor: "name",
        },
        {
            header: "Capacity",
            accessor: "capacity",
            className: "hidden md:table-cell",
        },
        {
            header: "Grade",
            accessor: "grade",
            className: "hidden md:table-cell",
        },
        {
            header: "Supervisor",
            accessor: "supervisor",
            className: "hidden md:table-cell",
        },
        ...(role === "admin" ? [{
            header: "Actions",
            accessor: "actions"
        }] : [])
    ];
    return (<div className="bg-white p-4 flex-1 rounded-md m-4">
        {/* Top */}
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold hidden md:block">All Classes</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <TableSearch />
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-uYellow">
                        <Image src={"/filter.png"} alt="" width={14} height={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-uYellow">
                        <Image src={"/sort.png"} alt="" width={14} height={14} />
                    </button>
                    {role === "admin" && (<>
                    <FormContainer table="class" type="create" />
                    </>)}
                </div>
            </div>
        </div>
        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* Pagination */}
        <Pagination page={p} count={count} />
    </div>);
}

export default ClassListPage;