
export default function Tab({ currentSelected, currentGroup, tab, handleChange, index }) {
    const isActive = currentSelected === index;
    const isInCurrentGroup = currentGroup.includes(index);

    if (!isInCurrentGroup) {
        return null;
    };

    const className = `tab ${isActive ? 'selected' : ''}`;

    return (
        <button className={className} onClick={() => handleChange(index)}>
            {tab.label}
        </button>
    )
}