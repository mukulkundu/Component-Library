import { useState, useEffect } from "react"
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'



export default function ThemeButton() {

    const [isDarkMode, setIsDarkMode] = useState(() => {
    const dark = localStorage.getItem('darkMode') ?? 'false';
    return dark === 'true';
})

    const toggleDarkModeUI = () => {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }

        localStorage.setItem("darkMode", isDarkMode.toString());

    }, [isDarkMode])

    return (

        <>
            <button onClick={toggleDarkModeUI} className="cursor-pointer hover:bg-gray-400 p-2 rounded-2xl">
                {isDarkMode ? <img src={sun} alt="" className="w-7" /> : <img src={moon} alt="" className="w-7" />}
            </button>
        </>
    )
}