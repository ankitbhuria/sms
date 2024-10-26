"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";


const schema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "username must be at most 20 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    firstName: z.string().min(3, { message: "First name must be at least 3 characters long" }).max(20, { message: "First name must be at most 20 characters long" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 characters long" }).max(20, { message: "Last name must be at most 20 characters long" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters long" }).max(10, { message: "Phone number must be at most 10 characters long" }),
    address: z.string().min(3, { message: "Address must be at least 3 characters long" }).max(50, { message: "Address must be at most 50 characters long" }),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.date({ message: "Birthday is required!" }),
    sex: z.enum(["male", "female"], { message: "Sex is required!" }),
    img: z.instanceof(File, { message: "Image is required!" }),
})
type Inputs = z.infer<typeof schema>;
const StudentForm = ({ type, data, setOpen }: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: data?.username,
            email: data?.email,
            password: data?.password,
            firstName: data?.firstName,
            lastName: data?.lastName,
            phone: data?.phone,
            address: data?.address,
            bloodType: data?.bloodType,
            birthday: data?.birthday,
            sex: data?.sex,
            img: data?.img
        }
    })


    const onSubmit = handleSubmit(data => {
        console.log(data);
    })
    return (<form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Create a new teacher</h1>
        <span className="text-xs text-gray-400 font-medium">
            Authentication Information
        </span>
        <div className="flex md:flex-row flex-col justify-between">
            <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors.username} />
            <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors.email} />
            <InputField label="Password" name="password" defaultValue={data?.password} register={register} error={errors.password} type="password" />
        </div>
        <span className="text-xs text-gray-400 font-medium">Personal Information</span>
        <div className="flex justify-between flex-wrap gap-4">
            <InputField label="firstName" name="firstName" defaultValue={data?.firstName} register={register} error={errors.firstName} />
            <InputField label="lastName" name="lastName" defaultValue={data?.lastName} register={register} error={errors.lastName} />
            <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
            <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
            <InputField label="BloodType" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType} />
            <InputField label="birthday" name="birthday" defaultValue={data?.birthday} register={register} error={errors.birthday} type="date" />
            <InputField label="Sex" name="sex" defaultValue={data?.sex} register={register} error={errors.sex} />
        </div>
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label htmlFor="sex" className="text-xs text-gray-500">{"Sex"}</label>
                <select {...register("sex")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" defaultValue={data?.sex} defaultChecked={data?.sex}>
                    <option value="male">Male</option>
                    <option value="female">FeMale</option>
                </select>
                {errors.sex?.message && (<p className="text-xs text-red-400">{errors.sex.message.toString()}</p>)}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label htmlFor="img" className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer">
                    <Image src="/upload.png" alt="" width={28} height={28} />
                    <span>Upload a photo</span>
                </label>
                <input type="file" id="img" {...register("img")} className="hidden" />
                {errors.img?.message && (<p className="text-xs text-red-400">{errors.img.message.toString()}</p>)}
            </div>
        </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
    </form>);
}

export default StudentForm;