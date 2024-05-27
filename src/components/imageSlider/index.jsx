import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import './styles.css';

// ImageSlider Component: A functional component for displaying a carousel of images fetched from an API
export default function ImageSlider({ url, page = 1, limit = 5 }) {
    // State variables to manage images, current slide, loading status, and error handling
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch images from the API
    async function fetchImages() {
        try {

            setLoading(true); // Set loading state to true while fetching
            setError(null); // Reset any previous errors
            const res = await fetch(`${url}?page=${page}&limit=${limit}`)
            if (!res.ok) {
                throw new Error('Error occured. Please try again.') // Throw error if response is not ok
            }
            const data = await res.json(); // Parse the JSON response
            setImages(data); // Update the images state
        } catch (err) {
            setError('Error occured:', err.message) // Set error state if fetching fails
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    // Handle click event to set the current slide
    function handleClick(index) {
        setCurrentSlide(index);
    }

    // Handle navigation to the previous slide
    function handlePrevious() {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    }

    // Handle navigation to the next slide
    function handleNext() {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    }

    // useEffect hook to fetch images when the component mounts or the URL changes
    useEffect(() => {
        fetchImages();
    }, [url])

    // Display loading message while images are being fetched
    if (loading) {
        return <div>Loading...</div>
    }

    // Display error message if fetching images fails
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='image-slider-container-wrapper'>
        <div className='image-slider-container'>
            <BsArrowLeftCircleFill onClick={handlePrevious} className='arrow arrow-left' />
            {
                images.map((image, index) => (
                    <img
                        key={image.id}
                        className={currentSlide === index ? 'image' : 'image hidden'}
                        src={image.download_url}
                        alt={image.download_url}
                    />
                ))
            }
            <BsArrowRightCircleFill onClick={handleNext} className='arrow arrow-right' />
            <span className='circle-indicator-container'>
                {
                    images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            className={
                                currentSlide === index
                                    ? 'circle-indicator active'
                                    : 'circle-indicator inactive'
                            }
                        >
                        </button>
                    ))
                }
            </span>
        </div>
        </div>
    )
}