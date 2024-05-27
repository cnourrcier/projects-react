import { useEffect, useState } from "react"

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        let currentValue;

        try {
            const item = localStorage.getItem(key);
            currentValue = item ? JSON.parse(item) : defaultValue;
        }
        catch (err) {
            console.log(err);
            currentValue = defaultValue;
        }
        return currentValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue];
}