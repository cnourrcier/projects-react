import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import MenuList from './MenuList';

export default function MenuItem({ item }) {
    const [currentChildrenDisplayed, setCurrentChildrenDisplayed] = useState({});

    function handleToggleChildrenDisplay() {
        setCurrentChildrenDisplayed({ ...currentChildrenDisplayed, [item.label]: !currentChildrenDisplayed[item.label] })
    }

    return (
        <li className='list-item'>
            <div className='list-item-label-container'>
                <p className={currentChildrenDisplayed[item.label] ? 'list-item-label children-displayed' : 'list-item-label'}>{item.label}</p>
                {
                    item?.children?.length
                        ? <span onClick={handleToggleChildrenDisplay}>
                            {
                                currentChildrenDisplayed[item.label]
                                    ? <FaMinus className='minus' size={25} />
                                    : <FaPlus className='plus' size={25}
                                    />
                            }
                        </span>
                        : null
                }
            </div>
            {
                item?.children?.length && currentChildrenDisplayed[item.label]
                    ? <MenuList list={item.children} />
                    : null
            }
        </li>
    )
}