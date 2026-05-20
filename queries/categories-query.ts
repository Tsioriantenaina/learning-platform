import {Category} from "@/model/category-model";
import {ICategory} from "@/types/types";
import {Types} from "mongoose";
import {replaceMongoIdInArray} from "@/lib/convertData";

export async function getCategoryList(): Promise<(Omit<ICategory, "_id"> & { id: string } )[]> {
    const categories =  await Category.find({}).lean<(ICategory & { _id: Types.ObjectId })[]>();
    return replaceMongoIdInArray(categories);
}