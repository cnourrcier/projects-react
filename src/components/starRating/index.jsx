import { FaStar } from 'react-icons/fa';
import './styles.css';
import { useState } from 'react';

export default function StarRating({ starCount = 5 }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(currentIndex) {
        setRating(currentIndex);
    }

    function handleMouseEnter(currentIndex) {
        setHover(currentIndex);
    }

    function handleMouseLeave(currentIndex) {
        setHover(0);
    }

    return (
        <div className='star-rating-container'>
            <div className='star-rating'>
                {
                    Array.from({ length: starCount }).map((_, index) => {
                        index += 1;

                        return (
                            <FaStar
                                key={index}
                                className={index <= (hover || rating) ? 'star-active' : 'star-inactive'}
                                onClick={() => handleClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave()}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}