import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, {message: "Subject name is required!"}),
    teachers: z.array(z.string()) // teachers id
})
export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, {message: "Subject name is required!"}),
    capacity: z.coerce.number().min(1, {message: "Capacity is required!"}),
    gradeId: z.coerce.number().min(1, {message: "Grade is required!"}),
    supervisorId: z.string().optional()
})
export type ClassSchema = z.infer<typeof classSchema>;
export const teacherSchema = z.object({
    id: z.string().optional(),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "username must be at most 20 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).optional().or(z.literal("")),
    name: z.string().min(3, { message: "First name must be at least 3 characters long" }).max(20, { message: "First name must be at most 20 characters long" }),
    surname: z.string().min(3, { message: "Last name must be at least 3 characters long" }).max(20, { message: "Last name must be at most 20 characters long" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters long" }).max(10, { message: "Phone number must be at most 10 characters long" }).optional(),
    address: z.string().min(3, { message: "Address must be at least 3 characters long" }).max(50, { message: "Address must be at most 50 characters long" }),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    img: z.string().optional(),
    subject: z.array(z.string()).optional() // subject ids
})
export type TeacherSchema = z.infer<typeof teacherSchema>