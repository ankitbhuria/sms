"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { ClassSchema, classSchema, subjectSchema, SubjectSchema } from "@/lib/FormValidationSchemas";
import { createClass, createSubject, updateClass, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



const ClassForm = ({ type, data, setOpen, relatedData }: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>,
    relatedData?: any
}) => {
    console.log(data)
    const { register, handleSubmit, formState: { errors } } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
        defaultValues: {

            id: data?.id
        }
    })
    // After React 19 It'll we useActionState
    const [state, formAction] = useFormState(type === "create" ? createClass : updateClass, {
        success: false, error: false
    })

    const onSubmit = handleSubmit(data => {
        console.log(data);
        formAction(data);
    })
    const router = useRouter();
    useEffect(() => {
        if (state.success) {
            toast(`Class has been ${type === "create" ? "created!" : "updated!"}`)
            setOpen(false);
            router.refresh()
        }
    }, [state])
    const { teachers, grades } = relatedData;
    return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">
            {type === "create" ? "Create a new Class" : "Update a Class"}
            </h1>
        <div className="flex md:flex-row flex-col justify-between">
            <InputField label="Class Name" name="name" defaultValue={data?.name} register={register} error={errors?.name} />

            <InputField label="Capacity Name" name="capacity" defaultValue={data?.capacity} register={register} error={errors?.capacity} />

            {data && (<InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} hidden />)}
            {state.error && (
                <span className="text-red-500">Something went wrong!</span>
            )}
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label htmlFor="supervisor" className="text-xs text-gray-500">
                Supervisor
                    </label>
                <select {...register("supervisorId")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" defaultValue={data?.teachers} defaultChecked={data?.teachers}>
                    {teachers.map((teacher: {
                        id: string; name: string; surname: string
                    }) => (
                        <option value={teacher.id} key={teacher.id} selected={data && teacher.id === data.supervisorId}>{teacher.name + " " + teacher.surname}</option>
                    ))}
                </select>
                {errors.supervisorId?.message && (
                <p className="text-xs text-red-400">
                    {errors.supervisorId.message.toString()}
                </p>)}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label htmlFor="grade" className="text-xs text-gray-500">
                Grade
                </label>
                <select {...register("gradeId")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" defaultValue={data?.gradeId} defaultChecked={data?.gradeId}>
                    {grades.map((grade: {
                        id: number; level: number
                    }) => (
                        <option value={grade.id} key={grade.id} selected={data && grade.id === data.gradeId}>
                            {grade.level}
                        </option>
                    ))}
                </select>
                {errors.gradeId?.message && (<p className="text-xs text-red-400">{errors.gradeId?.message.toString()}</p>)}
            </div>
        </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
    </form>);
}

export default ClassForm;