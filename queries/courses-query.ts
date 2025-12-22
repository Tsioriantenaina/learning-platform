import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import {Testimonial} from "@/model/testimonial-model";
import {Module} from "@/model/module-model";
import {replaceMongoIdInArray} from "@/lib/convertData";
import {Types} from "mongoose";
import {ICourse} from "@/types/types";

export async function getCourseList(): Promise<(Omit<ICourse, "_id"> & { id: string })[]> {
    const courses = await Course.find({}).select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor"]).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial
    }).populate({
        path: "modules",
        model: Module
    }).lean<(ICourse & { _id: Types.ObjectId })[]>();

    return replaceMongoIdInArray(courses);
}