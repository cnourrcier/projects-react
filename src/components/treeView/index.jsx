import MenuList from "./MenuList";
import './styles.css';

export default function TreeView({ list = [] }) {

    return (
        <div className='background-container'>
        <div className='tree-view-container'>
            <MenuList list={list} />
        </div>
        </div>
    )
}