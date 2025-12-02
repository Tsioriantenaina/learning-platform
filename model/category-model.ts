import mongoose, {Schema, ObjectId, Model} from "mongoose";
export interface ICategoryDocument {
    _id?: string | ObjectId
    title: string;
    thumbnail: string;
    description?: string;
}

const categorySchema: Schema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    thumbnail: {
        required: true,
        type: String
    }

});

export const Category: Model<ICategoryDocument> = mongoose.models.Category ?? mongoose.model<ICategoryDocument>("Category", categorySchema);