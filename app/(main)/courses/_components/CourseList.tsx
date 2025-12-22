import {ICourseDTO} from "@/types/types";

import CourseCard from "@/app/(main)/courses/_components/CourseCard";
import {FC} from "react";

interface CourseListProps {
    courses: ICourseDTO[];
}

const CourseList: FC<CourseListProps> = ({courses}) => {

    return (
        <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {courses.map((course) => {
                return (
                    <CourseCard key={course.id} course={course} />
                );
            })}
        </div>
    )
}
export default CourseList
