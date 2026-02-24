import React, {FC} from 'react'
import {BookCheck, Clock10, Radio} from "lucide-react";
import {Accordion} from "@/components/ui/accordion";
import CourseModuleList from "@/app/(main)/courses/[id]/_components/module/CourseModuleList";
import {ICourseDTO, IModuleDTO} from "@/types/types";

interface CourseCurriculumProps {
    course: ICourseDTO;
}

const CourseCurriculum: FC<CourseCurriculumProps> = ({ course }) => {
    const { modules } = course;

    const totalDuration = modules.reduce((acc, module) => acc + module.duration, 0);
    return (
        <>
            <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                    <BookCheck className="w-4 h-4" />
                    {modules.length} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock10 className="w-4 h-4" />
                    { (totalDuration / 60).toPrecision(2) } + Hours
                </span>
                <span className="flex items-center gap-1.5">
                    <Radio className="w-4 h-4" />4 Live Class
                </span>
            </div>

            {/* contents */}
            <Accordion
                defaultValue={modules.map((_, index) => `item-${index}`)}
                type="multiple"
                className="w-full"
            >
                {modules && modules.map((module: IModuleDTO, index: number) => (
                    <CourseModuleList key={module.id || index} module={module} index={index}/>
                ))}
            </Accordion>
        </>
    )
}
export default CourseCurriculum
