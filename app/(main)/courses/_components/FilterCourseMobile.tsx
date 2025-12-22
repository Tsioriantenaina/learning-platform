"use client";

import {FC} from 'react'
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Filter} from "lucide-react";
import FilterAccordion from "@/app/(main)/courses/_components/FilterAccordion";
import {ICategoryOption, IFilter, IPriceOption} from "@/app/(main)/courses/_components/CoursesClient";

interface FilterCourseMobileProps {
    categoriesOption: ICategoryOption[];
    pricesOption: IPriceOption[];
    applyArrayFilter: (filter: {type:  keyof IFilter; value: string;}) => void;
    filter: IFilter;
}

const FilterCourseMobile: FC<FilterCourseMobileProps> = ({ pricesOption, categoriesOption, filter, applyArrayFilter }) => {

    return (
        <div className="ml-2 lg:hidden">
            <Sheet>
                <SheetTrigger>
                    <Filter className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle className="text-left">Filter Courses</SheetTitle>
                        <FilterAccordion applyArrayFilter={applyArrayFilter} filter={filter} categoriesOption={categoriesOption} pricesOption={pricesOption} />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
export default FilterCourseMobile
