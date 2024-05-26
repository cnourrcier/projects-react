import { useState } from 'react';
import Tab from './Tab';
import './styles.css';

export default function TabContainer({ tabs }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    function handleChange(index) {
        setCurrentIndex(index);
    }

    return (
        <>
            <div className='tab-bar-wrapper'>
                <div className='tabs-container'>
                    {
                        tabs.map((tab, index) => <Tab key={index} currentIndex={currentIndex} tab={tab} handleChange={handleChange} index={index} />)
                    }
                </div>
            </div>
            <div className='content'>
                {tabs[currentIndex]?.content}
            </div>
        </>
    )
}