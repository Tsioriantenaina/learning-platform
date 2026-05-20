import {
   ITestimonial, ITestimonialDTO,
} from "@/types/types";
import {replaceMongoIdInObject} from "@/lib/convertData";
import {Testimonial} from "@/model/testimonial-model";

export async function getTestimonialsForCourse(courseId: string): Promise<ITestimonialDTO[]> {

    const testimonials =  await Testimonial.find({ courseId: courseId}).lean<ITestimonial[]>();

    return testimonials.map((testimonial: ITestimonial) => {
        const { _id, ...rest } = testimonial;

        return {
            ...rest,
            id: _id.toString(),
            courseId: replaceMongoIdInObject(testimonial.courseId),
            user: replaceMongoIdInObject(testimonial.user)
        };
    });
}