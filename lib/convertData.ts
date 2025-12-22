import { Document, Types} from "mongoose";

/**
 * Replace _id with id in an array of Mongo documents
 *
 * @param array
 */
export const replaceMongoIdInArray = <T extends {_id: Types.ObjectId}>(array: T[]) : (Omit<T, "_id"> & { id: string })[] => {
    return array.map((item: T) => {
      return {
        id: item._id.toString(),
        ...item
      }
    }).map(({_id, ...rest}) => rest);
  }

export const replaceMongoIdInObject = <T extends Document>(obj: T): (Omit<T, "_id"> & {id: string}) => {
    const {_id, ...updatedObj} = {...obj, id: obj._id.toString()};
    return updatedObj as (Omit<T, "_id"> & {id: string});
}