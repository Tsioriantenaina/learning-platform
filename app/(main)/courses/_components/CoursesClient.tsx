'use client';

import {FC, useState} from "react";
import SearchCourse from "@/app/(main)/courses/_components/SearchCourse";
import SortCourse from "@/app/(main)/courses/_components/SortCourse";
import FilterCourseMobile from "@/app/(main)/courses/_components/FilterCourseMobile";
import ActiveFilters from "@/app/(main)/courses/_components/ActiveFilters";
import FilterCourse from "@/app/(main)/courses/_components/FilterCourse";
import CourseList from "@/app/(main)/courses/_components/CourseList";
import {ICourseDTO} from "@/types/types";

export interface IPriceOption {
    label: string;
    value: string;
}

const PRICE_OPTIONS: IPriceOption[] = [
    { label: "Free", value: "free" },
    { label: "Paid", value: "paid" },
];

const SIZE_FILTERS = {
    id: "size",
    name: "Size",
    options: [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
    ],
};

export interface ICategoryOption {
    id: number;
    label: string;
    value: string;
}

const CATEGORY_OPTIONS: ICategoryOption[] = [
    {
        id: 1,
        label: "Design",
        value: "design",
    },

    {
        id: 3,
        label: "Development",
        value: "development",
    },
    {
        id: 4,
        label: "Marketing",
        value: "marketing",
    },
    {
        id: 5,
        label: "IT & Software",
        value: "it-software",
    },
    {
        id: 6,
        label: "Personal Development",
        value: "personal-development",
    },
    {
        id: 7,
        label: "Business",
        value: "business",
    },
    {
        id: 8,
        label: "Photography",
        value: "photography",
    },
    {
        id: 9,
        label: "Music",
        value: "music",
    },
];

export interface IFilter {
    categories: string[];
    price: string[];
    sort: string;
}

interface CoursesClientProps {
    courses: ICourseDTO[];
}

const CoursesClient: FC<CoursesClientProps> = ({courses}) => {
    const [filter, setFilter] = useState<IFilter>({
        categories: ["development"],
        price: ["free"],
        sort: "",
    });

    //   apply checkbox filter
    const applyArrayFilter = ({ type, value }: {type: keyof IFilter; value: string;}) => {
        const isFilterApplied: boolean = filter[type].includes(value);

        if (isFilterApplied) {
            setFilter((prev: IFilter) => ({
                ...prev,
                [type]: (prev[type] as string[]).filter((v) => v !== value),
            }));
        } else {
            setFilter((prev: IFilter) => ({
                ...prev,
                [type]: [...prev[type], value],
            }));
        }
    };

    return (
        <section
            id="courses"
            className="container space-y-6   dark:bg-transparent py-6"
        >
            {/* <h2 className="text-xl md:text-2xl font-medium">All Courses</h2> */}
            {/* header */}
            <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
                <SearchCourse />

                <div className="flex items-center justify-end gap-2 max-lg:w-full">
                    <SortCourse />
                    {/* Filter Menus For Mobile */}
                    <FilterCourseMobile filter={filter} applyArrayFilter={applyArrayFilter} categoriesOption={CATEGORY_OPTIONS} pricesOption={PRICE_OPTIONS}/>
                </div>
            </div>
            {/* header ends */}
            {/* active filters */}
            <ActiveFilters filter={filter} applyArrayFilter={applyArrayFilter} />

            <section className="pb-24 pt-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    {/* these component can be re use for mobile also */}
                    <FilterCourse filter={filter} applyArrayFilter={applyArrayFilter} categoriesOption={CATEGORY_OPTIONS}  pricesOption={PRICE_OPTIONS}/>
                    {/* Course grid */}
                    <CourseList courses={courses}/>
                </div>
            </section>
        </section>
    );
}
export default CoursesClient
