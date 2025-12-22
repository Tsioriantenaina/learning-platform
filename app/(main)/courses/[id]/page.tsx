import CourseDetailBanner from "@/app/(main)/courses/[id]/_components/CourseDetailBanner";
import CourseDetails from "@/app/(main)/courses/[id]/_components/CourseDetails";
import Testimonials from "@/app/(main)/courses/[id]/_components/Testimonials";
import RelatedCourse from "@/app/(main)/courses/[id]/_components/RelatedCourse";
import {getCourseList} from "@/queries/courses-query";
import {ICourseDTO} from "@/types/types";

const SingleCoursePage = async () => {

    const courses: ICourseDTO[] = await getCourseList();
    const courseParsed = JSON.parse(JSON.stringify(courses));
    return (
        <>
            <CourseDetailBanner />

            <CourseDetails />

            {/* Testimonials */}
            <Testimonials courses={courseParsed} />

            {/* Releated Course */}
            <RelatedCourse courses={courseParsed} />
            {/* Authors */}
            {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
            {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
        </>
    );
};
export default SingleCoursePage;

