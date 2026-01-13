import CourseDetailBanner from "@/app/(main)/courses/[id]/_components/CourseDetailBanner";
import CourseDetails from "@/app/(main)/courses/[id]/_components/CourseDetails";
import Testimonials from "@/app/(main)/courses/[id]/_components/Testimonials";
import RelatedCourse from "@/app/(main)/courses/[id]/_components/RelatedCourse";
import {getCourseDetails } from "@/queries/courses-query";
import {ICourse, ICourseDTO} from "@/types/types";


const SingleCoursePage = async ({params}: {params: Promise<{ id: string }>}) => {
    const { id } = await params;
    const course: ICourseDTO = await getCourseDetails(id);
    // const courseParsed = JSON.parse(JSON.stringify(course));

    console.log(course)
    return (
        <>
            <CourseDetailBanner course={course} />

            <CourseDetails course={course} />

            {/* Testimonials */}
            {(course?.testimonials && course.testimonials.length > 0) && <Testimonials testimonials={course.testimonials} />}

            {/* Releated Course */}
            <RelatedCourse course={course} />
            {/* Authors */}
            {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
            {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
        </>
    );
};
export default SingleCoursePage;

