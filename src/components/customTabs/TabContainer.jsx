import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Tab from './Tab';
import './styles.css';

export default function TabContainer({ tabs }) {
    const [currentSelected, setCurrentSelected] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentGroup, setCurrentGroup] = useState([0, 1, 2]);

    function handleChange(index) {
        setCurrentSelected(index);
    }

    function handlePrevious() {
        setCurrentIndex(currentIndex === 0 ? tabs.length - 1 : currentIndex - 1)
    }

    function handleNext() {
        setCurrentIndex(currentIndex === tabs.length - 1 ? 0 : currentIndex + 1)
    }

    useEffect(() => {
        setCurrentGroup([currentIndex, currentIndex + 1, currentIndex + 2])
    }, [currentIndex]);

    return (
        <>
            <div className='tab-bar-wrapper'>
                <BsArrowLeftCircleFill className={`tab-arrow left ${currentIndex === 0 ? 'disabled' : ''}`} onClick={handlePrevious} />
                <div className='tabs-container'>
                    {
                        tabs.map((tab, index) => <Tab key={index} currentSelected={currentSelected} currentGroup={currentGroup} tab={tab} handleChange={handleChange} index={index} />)
                    }
                </div>
                <BsArrowRightCircleFill className={`tab-arrow right ${currentIndex + 2 === tabs.length - 1 ? 'disabled' : ''}`} onClick={handleNext} />
            </div>
            <div className='content'>
                {tabs?.length && tabs[currentSelected]?.content}
            </div>
        </>
    )
}