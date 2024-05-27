import MenuItem from "./MenuItem";

export default function MenuList({list=[]}) {
    return (
        <ul className='menu-list-container'>
            {
                list.map((listItem, index) => <MenuItem key={index} item={listItem}/>)
            }
        </ul>
    )
}