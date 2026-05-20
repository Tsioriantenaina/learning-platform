import {FC} from 'react'
import FilterAccordion from "@/app/(main)/courses/_components/FilterAccordion";
import {ICategoryOption, IFilter, IPriceOption} from "@/app/(main)/courses/_components/CoursesClient";

interface FilterCourseProps {
    categoriesOption: ICategoryOption[];
    pricesOption: IPriceOption[];
    applyArrayFilter: (filter: {type:  keyof IFilter; value: string;}) => void;
    filter: IFilter;
}

const FilterCourse: FC<FilterCourseProps> = ({categoriesOption, pricesOption, filter, applyArrayFilter}) => {

    return (
        <div className="hidden lg:block">
            <FilterAccordion filter={filter} applyArrayFilter={applyArrayFilter} categoriesOption={categoriesOption} pricesOption={pricesOption} />
        </div>
    )
}
export default FilterCourse
