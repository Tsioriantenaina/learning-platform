import React, {FC} from 'react'
import Image from "next/image";

interface StarRatingProps {
    rating: number;
}

const StarRating: FC<StarRatingProps> = ({rating}) => {
    // const stars = new Array(rating).fill(0);
    const stars = [];
    for(let i = 0; i < 5; i++) {
        if(i < rating) {
            stars.push(<Image alt="rating" src="/assets/star.svg" key={i} width={20} height={20} />);
        } else {
            stars.push(<Image alt="rating" src="/assets/emptyStar.svg" key={i} width={20} height={20} />);
        }
    }
    return (
        <>
            {
                // stars.map((_, index) => <Image alt="rating" key={index} src="/assets/star.svg" width={20} height={20} />)
                stars
            }
        </>
    )
}
export default StarRating
