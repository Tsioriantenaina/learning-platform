import {Category} from "@/model/category-model";

export async function getCategories() {
    return await Category.find({});
}