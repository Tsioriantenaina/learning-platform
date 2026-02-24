import {ILesson, ILessonDTO} from "@/types/types";
import {Lesson} from "@/model/lesson-model";

export async function getLesson(lessonId: string): Promise<ILessonDTO> {
    const lesson =  await Lesson.findById(lessonId).lean<ILesson>() as unknown as ILesson;

    return {
        ...lesson,
        id: lesson._id.toString(),
    }
}