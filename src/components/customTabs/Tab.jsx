
export default function Tab({ currentIndex, tab, handleChange, index }) {

    return (
        <button className={currentIndex === index ? 'tab active' : 'tab'} onClick={() => handleChange(index)}>
            {tab.label}
        </button>
    )
}