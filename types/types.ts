import {Types} from "mongoose";

export interface ISocialMedia {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}

export interface IUser {
    _id: Types.ObjectId;
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

export interface IUserDTO {
    id: string;
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
    _id: Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    module: IModule;
}

export interface ILessonDTO {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    module: IModuleDTO;
}

export interface IInstructor {
    _id: Types.ObjectId;
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

export interface IInstructorDTO {
    id: string;
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
    _id: Types.ObjectId;
    title: string;
    thumbnail: string;
    description?: string;
}

export interface ICategoryDTO {
    id: string;
    title: string;
    thumbnail: string;
    description?: string;
}

export interface ITestimonial {
    _id: Types.ObjectId;
    content: string;
    rating: number;
    courseId?: ICourse;
    user?: IUser;
}

export interface ITestimonialDTO {
    id: string;
    content: string;
    rating: number;
    courseId?: ICourseDTO;
    user?: IUserDTO;
}

export interface IModule {
    _id: Types.ObjectId;
    title: string;
    description: string;
    status: string;
    slug: string;
    course: ICourse;
    lessonIds: ILesson[];
    duration?: number;
}

export interface IModuleDTO {
    id: string;
    title: string;
    description: string;
    status: string;
    slug: string;
    course: ICourseDTO;
    lessonIds: ILessonDTO[];
    duration?: number;
}

interface IOptions {
    text: string;
    is_correct: boolean;
}

export interface IQuiz {
    _id: Types.ObjectId;
    question: string;
    description: string;
    options: IOptions[]
    explanations: string[];
    mark: number;
    slug: string;
}

export interface IQuizDTO {
    id: string;
    question: string;
    description: string;
    options: IOptions[]
    explanations: string[];
    mark: number;
    slug: string;
}

export interface ICourse  {
    _id: Types.ObjectId;
    title: string;
    description: string;
    thumbnail: string;
    modules: IModule[];
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

export interface ICourseDTO  {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    modules: IModuleDTO[];
    price: number;
    active: boolean;
    category?: ICategoryDTO;
    instructor: IInstructorDTO
    testimonials?: ITestimonialDTO[];
    quizSet?: IQuizDTO;
    subtitle: string;
    learning: string[];
    createdOn: Date;
    modifiedOn?: Date;
}