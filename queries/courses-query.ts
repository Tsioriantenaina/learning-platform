import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import {Testimonial} from "@/model/testimonial-model";
import {Module} from "@/model/module-model";
import {replaceMongoIdInArray} from "@/lib/convertData";
import {
    ICategory,
    ICourse,
    ICourseDTO,
    IInstructor,
    IInstructorDTO,
    IModule,
    IModuleDTO, IQuiz, IQuizDTO,
    ITestimonial, ITestimonialDTO
} from "@/types/types";

export async function getCourseList(): Promise<ICourseDTO[]> {
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
    }).lean<ICourse[]>();

    const formatedCourses = replaceMongoIdInArray(courses);

    return formatedCourses.map(({category, instructor, modules, testimonials, quizSet, ...rest}) => ({
        ...rest,
        category: category && (() => {
                const { _id, ...restCategory} = category as ICategory;
                return { ...restCategory, id: _id.toString() } as ICourseDTO
            })(),
        instructor:  (() => {
                const { _id, ...restInstructor} = instructor as IInstructor;
                return { ...restInstructor, id: _id.toString() } as IInstructorDTO
            })(),
        modules: modules && (() => {
                return modules.map((module) => {
                    const { _id, ...restModule } = module as IModule;
                    return { ...restModule, id: _id.toString() } as unknown as IModuleDTO
                })
            })(),
        testimonials: testimonials && (() => {
                return testimonials.map(testimonial => {
                    const { _id, ...restTestimonial } = testimonial as ITestimonial;
                    return { ...restTestimonial, id: _id.toString() } as ITestimonialDTO
                });
            })(),
        quizSet: quizSet && (() => {
            const { _id, ...restQuizSet} = quizSet as IQuiz;
            return { ...restQuizSet, id: _id.toString() } as IQuizDTO
        })(),
    }));
}