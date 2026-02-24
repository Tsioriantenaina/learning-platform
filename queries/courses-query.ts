import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import {Testimonial} from "@/model/testimonial-model";
import {Module} from "@/model/module-model";
import {convertIdOfArray, replaceMongoIdInObject} from "@/lib/convertData";
import {
    ICategory, ICategoryDTO,
    ICourse,
    ICourseDTO, IEnrollmentDTO,
    IInstructor,
    IInstructorDTO,
    IModule,
    IModuleDTO, IQuiz, IQuizDTO,
    ITestimonial, ITestimonialDTO,
} from "@/types/types";
import {getEnrollmentsForCourse} from "@/queries/enrollments-query";
import {getTestimonialsForCourse} from "@/queries/testimonials-query";

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


/**
 * Retrieves detailed information about a course by its ID, including related data such as category, instructor, modules, testimonials, and quiz set.
 *
 * @param {string} id - The unique identifier of the course to retrieve.
 * @return {Promise<ICourseDTO>} A promise that resolves to an object containing the detailed course data.
 */
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


/**
 * Fetches the course details associated with a specific instructor, including total enrollments and testimonials.
 *
 * @param {string} instructorId - The unique identifier of the instructor whose course details are to be retrieved.
 * @return {Promise<void>} A promise resolving to no value.
 */
export async function getCourseDetailsByInstructor(instructorId: string) {
    const courses: ICourse[] = await Course.find({ instructor: instructorId }).lean<ICourse[]>();

    const enrollments = await Promise.all(
        courses.map(async (course: ICourse) =>  await getEnrollmentsForCourse(course._id.toString()))
    );

    const totalEnrollments = enrollments.reduce((acc, cur: IEnrollmentDTO[]) => acc + cur.length, 0 );

    const testimonials = await Promise.all(
        courses.map(async (course: ICourse) => await getTestimonialsForCourse(course._id.toString()))
    )

    const totalTestimonials = testimonials.flat();

    const avarageRating = totalTestimonials.reduce((acc, cur) => acc + cur.rating, 0) / totalTestimonials.length;

    return {
        courses: courses.length,
        totalEnrollments,
        reviews: totalTestimonials.length,
        ratings: avarageRating
    }
}