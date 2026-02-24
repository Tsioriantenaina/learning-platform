import {
    IEnrollment,
    IEnrollmentDTO,
} from "@/types/types";
import { Enrollment } from "@/model/enrollment-model";
import {replaceMongoIdInObject} from "@/lib/convertData";

export async function getEnrollmentsForCourse(courseId: string): Promise<IEnrollmentDTO[]> {

    const enrollments =  await Enrollment.find({ course: courseId}).lean<IEnrollment[]>();

    return enrollments.map((enrollment: IEnrollment) => {
        const { _id, ...rest } = enrollment;

        return {
            ...rest,
            id: _id.toString(),
            course: replaceMongoIdInObject(enrollment.course),
            student: replaceMongoIdInObject(enrollment.student)
        };
    });
}