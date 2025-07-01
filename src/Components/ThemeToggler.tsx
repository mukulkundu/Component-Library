import { useRef } from 'react'
import ThemeButton from '../CodeModules/ThemeButton'
import Clip from '../CodeModules/Clip';


export default function ThemeToggler() {

    const themeButtonCode = `
import { useState, useEffect } from "react"
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'



export default function ThemeButton() {

    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkModeUI = () => {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }

    }, [isDarkMode])

    return (

        <>
            <button onClick={toggleDarkModeUI} className="cursor-pointer hover:bg-gray-400 p-2 rounded-2xl">
                {isDarkMode ? <img src={sun} alt="" className="w-7" /> : <img src={moon} alt="" className="w-7" />}
            </button>
        </>
    )
}
    `
    const themeRef = useRef(null);

    const usingBtn = `
<ThemeButton />
    `
    const usingBtnRef = useRef(null)

    return (


        <div className="pt-14 ml-24 dark:text-white">
            <h1 className="text-4xl font-medium">Theme Toggler</h1>

            <article className="mt-2 text-sm text-gray-700">
                Button Toggle to choose between Light or Dark Theme.
            </article>

            <section className="mt-12 bg-gray-200 dark:bg-[#1d1c1c] h-30 rounded-lg flex items-center justify-center w-[50%]">
                <ThemeButton />
            </section>

            <section className="mt-12">
                            <h2 className="text-3xl">Usage</h2>
                            <article>
                                <ol>
                                    <li className="py-4 w-[85%]">
                                        <p className='mb-2'>1. Create a New tsx file named ThemeButton.tsx and paste the code in it</p>
                                        <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] py-4 px-8 text-sm">
                                            <pre className="flex items-start justify-between">
                                                <code ref={themeRef}>
                                                    {themeButtonCode}
                                                </code>
                                                <div className="mt-2">
                                                    <Clip textToCopy={themeRef} />
                                                </div>
                                            </pre>
                                        </div>
                                    </li>
            
                                    <li className="py-4 w-[50%]">
                                        <p className='mb-2'>2. Now, import the ThemeButton component to the current file and use in it.</p>
                                        <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                            <pre className="flex items-center justify-between">
                                                <code className="flex" ref={usingBtnRef}>
                                                    {usingBtn}
                                                </code>
                                                <div>
                                                    <Clip textToCopy={usingBtnRef} />
                                                </div>
                                            </pre>
                                        </div>
                                    </li>

                                    <li className='py-4 w-[80%]'>
                                        <p className='mb-2'>3. Make sure to use the component in a section which state is not changed i.e. it should be a component which is common in all of the pages/sections and does not re-renders when routing to another.</p>
                                    </li>
                                </ol>
                            </article>
                        </section>


        </div>

    )
}