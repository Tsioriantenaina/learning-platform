import React, {FC} from 'react'
import {cn} from "@/lib/utils";

interface SectionTitleProps {
    children: string;
    className?: string;
}

const SectionTitle:FC<SectionTitleProps> = ({children, className} ) => {
    return (
        <h2 className={cn("text-xl md:text-2xl lg:text-3xl font-bold", className)}>{children}</h2>
    )
}
export default SectionTitle;
