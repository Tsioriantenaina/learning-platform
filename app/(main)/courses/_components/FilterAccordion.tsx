import React, {FC} from 'react'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";
import {ICategoryOption, IFilter, IPriceOption} from "@/app/(main)/courses/_components/CoursesClient";

interface FilterAccordionProps {
    applyArrayFilter: (filter: {type:  keyof IFilter; value: string;}) => void;
    filter: IFilter;
    categoriesOption: ICategoryOption[];
    pricesOption: IPriceOption[];
}

const FilterAccordion: FC<FilterAccordionProps> = ({applyArrayFilter, filter, pricesOption, categoriesOption}) => {
    return (
        <Accordion defaultValue={["categories"]} type="multiple">
            {/* Categories filter */}
            <AccordionItem value="categories">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Categories</span>
                </AccordionTrigger>

                <AccordionContent className="pt-6 animate-none">
                    <ul className="space-y-4">
                        {categoriesOption.map((option, optionIdx) => (
                            <li key={option.value} className="flex items-center">
                                <Checkbox
                                    id={`category-${optionIdx}`}
                                    onCheckedChange={() => {
                                        applyArrayFilter({
                                            type: "categories",
                                            value: option.value,
                                        });
                                    }}
                                    checked={filter.categories.includes(option.value)}
                                />
                                <label
                                    htmlFor={`category-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
            {/* Price filter */}
            <AccordionItem value="price">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Price</span>
                </AccordionTrigger>

                <AccordionContent className="pt-6 animate-none">
                    <ul className="space-y-4">
                        {pricesOption.map((option, optionIdx) => (
                            <li key={option.value} className="flex items-center">
                                <Checkbox
                                    id={`price-${optionIdx}`}
                                    onCheckedChange={() => {
                                        applyArrayFilter({
                                            type: "price",
                                            value: option.value,
                                        });
                                    }}
                                    checked={filter.price.includes(option.value)}
                                />
                                <label
                                    htmlFor={`price-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
export default FilterAccordion
