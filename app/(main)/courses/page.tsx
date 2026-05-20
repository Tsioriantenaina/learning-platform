
import {ICourseDTO} from "@/types/types";
import {getCourseList} from "@/queries/courses-query";
import CoursesClient from "@/app/(main)/courses/_components/CoursesClient";

const CoursesPage =  async () => {
    const courses: ICourseDTO[] = await getCourseList();
    return <CoursesClient courses={JSON.parse(JSON.stringify(courses))}/>;
};
export default CoursesPage;