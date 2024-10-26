"use server";

import { revalidatePath } from "next/cache";
import { TeacherSchema, SubjectSchema, ClassSchema } from "./FormValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";


// Subject Actions
export const createSubject = async (currentState: {success: boolean, error: boolean},data: SubjectSchema)=>{
    console.log(`data => `,data);
    try {
        await prisma.subject.create({
            data:{
                name: data.name,
                teachers: {
                    connect: data.teachers.map(teacherId=>({
                        id: teacherId
                    }))
                }
            }
        })
        // revalidatePath("/list/subjects");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}



export const updateSubject = async (currentState: {success: boolean, error: boolean},data: SubjectSchema)=>{
    console.log(`data => `,data)
    try {
        await prisma.subject.update({
            where: {
                id: data.id,

            },
            data:{
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId)=>({
                        id: teacherId
                    }))
                }
            }
        })
        // revalidatePath("/list/subjects");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}

export const deleteSubject = async (currentState: {success: boolean, error: boolean},data: FormData)=>{
    try {
        const id = data.get("id") as string;
        console.log(`data => `, id);
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            }
        })
        // revalidatePath("/list/subjects");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}



// Class Actions
export const createClass = async (currentState: {success: boolean, error: boolean},data: ClassSchema)=>{
    console.log(`data => `,data);
    try {
        await prisma.class.create({
            data
        })
        // revalidatePath("/list/class");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}



export const updateClass = async (currentState: {success: boolean, error: boolean},data: ClassSchema)=>{
    console.log(`data => `,data)
    try {
        await prisma.class.update({
            where: {
                id: data.id,

            },
            data
        })
        // revalidatePath("/list/class");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}

export const deleteClass = async (currentState: {success: boolean, error: boolean},data: FormData)=>{
    try {
        const id = data.get("id") as string;
        console.log(`data => `, id);
        await prisma.class.delete({
            where: {
                id: parseInt(id),
            }
        })
        // revalidatePath("/list/class");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}






// Teacher Actions
export const createTeacher = async (currentState: {success: boolean, error: boolean},data: TeacherSchema)=>{
    console.log(`data => `,data);
    try {
        const user = await clerkClient.user.createUser({
            username: data.username,
            emailAddress: [data.email],
            password: data.password,
            firstName: data.name,
            lastName: data.surname
        })
        console.log(`user => `, user);
        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.address || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    connect: data.subject?.map((subjectId: string)=>({
                        id: parseInt(subjectId)
                    }))
                },
            }
        })
        // revalidatePath("/list/teacher");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}



export const updateTeacher = async (currentState: {success: boolean, error: boolean},data: TeacherSchema)=>{
    console.log(`data => `,data)
    try {
        await prisma.teacher.update({
            where: {
                id: data.id,

            },
            data
        })
        // revalidatePath("/list/teacher");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}

export const deleteTeacher = async (currentState: {success: boolean, error: boolean},data: FormData)=>{
    try {
        const id = data.get("id") as string;
        console.log(`data => `, id);
        await prisma.teacher.delete({
            where: {
                id
            }
        })
        // revalidatePath("/list/class");
        return {success: true, error: false}
    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}