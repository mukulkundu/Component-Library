import { useState, useEffect } from "react"
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'


/*
This function takes doesn't takes any input, it take the value of darkMode from the local storage and if it is not there then it takes the default value as false and compares to the 'true' and then sets the value of the useState isDarkMode which is used for further process.
*/
export default function ThemeButton() {

    const [isDarkMode, setIsDarkMode] = useState(() => {
    const dark = localStorage.getItem('darkMode') ?? 'false';
    return dark === 'true';
})

    const toggleDarkModeUI = () => {
        setIsDarkMode(!isDarkMode);
    }

/*
   This useEffect adds or remove dark in class of the HTML tag which enables for the dark mode, and then save it to the local storage as a string which is helpful to maintain the state when the webpage is reloaded 
*/
    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }

        localStorage.setItem("darkMode", isDarkMode.toString());

    }, [isDarkMode])


/*
This component returns a toggle button to add or remove dark class from the HTML tag which is then used for darkmode shifting using tailwind css.
*/
    return (

        <>
            <button onClick={toggleDarkModeUI} className="cursor-pointer hover:bg-gray-400 p-2 rounded-2xl">
                {isDarkMode ? <img src={sun} alt="" className="w-7" /> : <img src={moon} alt="" className="w-7" />}
            </button>
        </>
    )
}