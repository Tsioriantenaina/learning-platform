import { Document, Types} from "mongoose";
import {ILesson, IModule, IModuleDTO} from "@/types/types";

/**
 * Replace _id with id in an array of Mongo documents
 *
 * @param array
 */
export const replaceMongoIdInArray = <T extends { _id: Types.ObjectId }>(array: T[]): (Omit<T, "_id"> & {
    id: string
})[] => {
    return array.map((item: T) => {
        return {
            id: item._id.toString(),
            ...item
        }
    }).map(({_id, ...rest}) => rest);
}

export const replaceMongoIdInObject = <T extends { _id: Types.ObjectId }, ReturnType>( obj: T): ReturnType => {
    const {_id, ...updatedObj} = obj;
    return {...updatedObj, id: _id.toString()} as ReturnType;
}


export function convertIdOfArray<T extends { _id: Types.ObjectId | string }, ReturnType>(
    array?: T[]
): ReturnType[] {
    if (!Array.isArray(array) || array.length === 0) return [];

    return array.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
    })) as ReturnType[];
}