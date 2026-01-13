import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import {Testimonial} from "@/model/testimonial-model";
import {Module} from "@/model/module-model";
import {convertIdOfArray, replaceMongoIdInArray, replaceMongoIdInObject} from "@/lib/convertData";
import {
    ICategory, ICategoryDTO,
    ICourse,
    ICourseDTO,
    IInstructor,
    IInstructorDTO,
    IModule,
    IModuleDTO, IQuiz, IQuizDTO,
    ITestimonial, ITestimonialDTO, IUser, IUserDTO
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

    // const formatedCourses = replaceMongoIdInArray(courses);

    return courses.map(({category, instructor, modules, testimonials, quizSet, ...rest}) => ({
        ...rest,
        id: rest._id.toString(),
        category: replaceMongoIdInObject<ICategory, ICategoryDTO>(category),
        instructor:  replaceMongoIdInObject<IInstructor, IInstructorDTO>(instructor),
        modules: convertIdOfArray<IModule, IModuleDTO>(modules),
        testimonials: convertIdOfArray<ITestimonial, ITestimonialDTO>(testimonials),
        quizSet: quizSet && replaceMongoIdInObject<IQuiz, IQuizDTO>(quizSet),
    })) as unknown as ICourseDTO[];
}

export async function getCourseDetails(id: string): Promise<ICourseDTO> {
    const course: ICourse = await Course.findById(id).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial,
        populate: {
            path: "user",
            model: User
        },
    }).populate({
        path: "modules",
        model: Module
    }).lean<ICourse>() as unknown as ICourse;

    return {
        ...course,
        id: course._id.toString(),
        category: replaceMongoIdInObject<ICategory, ICategoryDTO>(course.category),
        instructor:  replaceMongoIdInObject<IInstructor, IInstructorDTO>(course.instructor),
        modules: convertIdOfArray<IModule, IModuleDTO>(course.modules),
        testimonials: convertIdOfArray<ITestimonial, ITestimonialDTO>(course.testimonials),
        quizSet: course.quizSet && replaceMongoIdInObject<IQuiz, IQuizDTO>(course.quizSet),
    }
}