import useLocalStorage from './useLocalStorage';
import './styles.css';
import { useEffect } from 'react';

export default function LightDarkMode() {
    const [theme, setTheme] = useLocalStorage('theme', 'dark');

    function handleToggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    //Use for Global themability
    // useEffect(() => {
    //     document.documentElement.setAttribute('data-theme', theme);
    // }, [theme]);

    return (
        //Component-level themability
        // data-theme encapsulated within component
        <div className='light-dark-container' data-theme={theme}>
            <div className='content-container'>
                <h1>Hello World!</h1>
                <button onClick={handleToggleTheme}>Change Theme</button>
            </div>
        </div>
    )
}