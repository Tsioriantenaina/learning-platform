import React, {FC} from 'react'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {FileQuestion, NotepadText, Radio, Video} from "lucide-react";
import CourseLessonList from "@/app/(main)/courses/[id]/_components/module/CourseLessonList";
import {IModuleDTO} from "@/types/types";

interface CourseModuleListProps {
    module: IModuleDTO;
    index: number;
}

const CourseModuleList: FC<CourseModuleListProps> = ({ module, index }) => {
    const { title, lessonIds, duration } = module;

    return (
        <>
            <AccordionItem className="rounded-2xl border mb-3" value={`item-${index}`}>
                <AccordionTrigger id={title} className="bg-gray-200 px-2 rounded-t-md decoration-0 cursor-pointer">{ title }</AccordionTrigger>
                <AccordionContent  className="px-2">
                    {/* header */}
                    <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                            <span className="flex items-center gap-1.5">
                                <Video className="w-4 h-4" />
                                {(duration / 60 ).toPrecision(2)} Hours
                            </span>
                        <span className="flex items-center gap-1.5">
                                <NotepadText className="w-4 h-4" />
                                10 Notes
                            </span>
                        <span className="flex items-center gap-1.5">
                                <FileQuestion className="w-4 h-4" />
                                10 Quiz
                            </span>
                        <span className="flex items-center gap-1.5">
                                <Radio className="w-4 h-4" />1 Live Class
                            </span>
                    </div>

                    {/* header ends */}
                    <div className="space-y-3">
                        {/* item */}
                        {
                            lessonIds.length > 0 && lessonIds.map((lessonId, index) => (
                                <CourseLessonList key={index} lessonId={lessonId.toString()}/>
                            ))
                        }
                        {/* item ends */}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </>
    )
}
export default CourseModuleList
