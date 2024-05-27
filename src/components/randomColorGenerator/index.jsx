import { useState } from "react";
import './styles.css';

// Functional component for generating random colors
const RandomColorGenerator = () => {
    const [colorType, setColorType] = useState('');
    const [color, setColor] = useState('');

    // Function to generate a random number between a given length
    function generateRandomNumber(length) {
        return Math.floor(Math.random() * length);
    }

    // Function to create a random color based on color type 
    function handleChooseRandomColor() {
        colorType === 'hex' ? handleCreateHex() : handleCreateRgb();
    }

    // Function to create a random hex color
    function handleCreateHex() {
        setColorType('hex');
        const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        let hexColor = '#';
        for (let i = 0; i < 6; i++) {
            hexColor += hexArray[generateRandomNumber(hexArray.length)];
        }
        setColor(hexColor);
    }

    // Function to create a random RGB color
    function handleCreateRgb() {
        setColorType('rgb');
        const r = generateRandomNumber(256);
        const g = generateRandomNumber(256);
        const b = generateRandomNumber(256);
        setColor(`rgb(${r}, ${g}, ${b})`);
    }

    // Function to convert color type to hsl and adjust lighting
    function handleCreateHsl() {
        if (colorType === 'hex') {
            const rgbColor = hexToRgb(color);
            if (rgbColor) {
                const hslColor = rgbToHsl(rgbColor);
                // Adjust lightness value here
                return adjustLightness(hslColor);
            }
        } else if (colorType === 'rgb') {
            const hslColor = rgbToHsl(color);
            // Adjust lightness value here
            return adjustLightness(hslColor);
        }
        return '';
    }

    // Function to convert RGB color to HSL color
    function rgbToHsl(rgb) {
        let [r, g, b] = rgb.match(/\d+/g).map(Number) // Extract R, G, B values
        r /= 255, g /= 255, b /= 255; // Normalize RGB values
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h *= 60;
        }
        return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
    }

    // Function to convert hex color to RGB color
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
    }

    // Function to adjust lightness of an HSL color
    function adjustLightness(hslColor) {
        // Adjust the lightness value here as needed to make text visible
        // For example, increase the lightness by 50%
        return hslColor.replace(/(\d+(\.\d+)?)(%)/g, (_, num, __, unit) => `${Math.min(parseFloat(num) + 50, 100)}${unit}`);
    }

    // Function to display color label with appropriate text color
    function handleDisplayColorLabel() {
        const hslColor = handleCreateHsl();
        return <h1 style={{ color: hslColor }} className='color-label'>{colorType.toUpperCase() + ':'} {color}</h1>
    }

    // Return JSX for RandomColorGenerator component
    return (
        <div className='color-generator-container' style={{ backgroundColor: color }}>
            <div className='button-container'>
                <button onClick={handleCreateHex}>Create Hex Color</button>
                <button onClick={handleCreateRgb}>Create RGB Color</button>
                <button onClick={handleChooseRandomColor}>Choose Random Color</button>
            </div>
            <div className='color-label-container'>
                {color && handleDisplayColorLabel()}
            </div>
        </div>
    )
}

export default RandomColorGenerator;