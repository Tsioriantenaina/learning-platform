import {ObjectId} from "mongoose";

export interface ISocialMedia {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}

export interface IUser {
    _id?: string | ObjectId
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    bio?: string;
    socialMedia?: ISocialMedia;
    profilePicture?: string;
    designation?: string;
}

export interface ILesson {
    _id: string | ObjectId
    title: string;
    description: string;
    videoUrl: string;
    module: IModule;
}

export interface IInstructor {
    _id: string | ObjectId;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    bio: string;
    socialMedia: ISocialMedia[],
    profilePicture: string;
    designation: string;
}

export interface ICategory {
    _id?: string | ObjectId
    title: string;
    thumbnail: string;
    description?: string;
}

export interface ITestimonial {
    _id?: string | ObjectId
    content: string;
    rating: number;
    courseId?: ICourse;
    user?: IUser;
}

export interface IModule {
    _id: string | ObjectId
    title: string;
    description: string;
    status: string;
    slug: string;
    course: ICourse;
    lessonIds: ILesson[];
    duration?: number;
}

interface IOptions {
    text: string;
    is_correct: boolean;
}

interface IQuiz {
    _id: string | ObjectId;
    question: string;
    description: string;
    options: IOptions[]
    explanations: string[];
    mark: number;
    slug: string;
}

export interface ICourse  {
    id: string
    title: string;
    description: string;
    thumbnail: string;
    modules?: IModule[];
    price: number;
    active: boolean;
    category?: ICategory;
    instructor: IInstructor
    testimonials?: ITestimonial[];
    quizSet?: IQuiz;
    subtitle: string;
    learning: string[];
    createdOn: Date;
    modifiedOn?: Date;
}