import { Link } from "react-router-dom";
import Clip from "../CodeModules/Clip";
import { useRef, useState } from "react";
import DialogImage from "../assets/alert-dialog.png"
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'
import plus from '../assets/plus.svg'
import CartCounter from "../CodeModules/CartCounter";


export default function Home() {

    // const componentsWithProperties = [
    //     {comp: <div></div> text: '' link: ''}
    // ]

    //textRef is used in the previewtab of the copy to clipboard component to pass the sample text's ref to the component
    const textref = useRef(null)

    const [isDarkMode, setIsDarkMode] = useState(false)
    const toggleDarkModeUI = () => {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <div className="grid-cols-3 grid gap-12 mx-16 pt-18">

            {/* copy to clipboard component preview tab */}
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]">
                <div className="h-[75%] flex flex-col justify-center items-center">
                    <p className="text-lg py-4" ref={textref}>Copy the text from screen</p>
                    <Clip textToCopy={textref} />
                </div>
                <div className="h-[25%] border-t-1 border-gray-400 text-xl flex items-center justify-center">
                    <Link className="hover:text-blue-600 font-medium hover:underline" to='/copy-to-clipboard'>Copy to Clipboard</Link>
                </div>
            </section>


            {/* alert dialog component preview tab */}
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]">
                <figure className="h-[75%] flex items-center justify-center">
                    <img src={DialogImage} alt="" className="h-[80%] rounded-xl" />
                </figure>
                <div className="h-[25%] border-t-1 border-gray-400 text-xl flex items-center justify-center">
                    <Link className="hover:text-blue-600 font-medium hover:underline" to='/alert-dialog'>Alert Dialog</Link>
                </div>
            </section>


            {/* theme toggler component preview tab */}
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]">
                <div className="h-[75%] flex items-center justify-center">
                    <button onClick={toggleDarkModeUI} className="cursor-pointer hover:bg-gray-400 p-2 rounded-2xl">
                        {isDarkMode ? <img src={sun} alt="" className="w-7" /> : <img src={moon} alt="" className="w-7" />}
                    </button>
                </div>
                <div className="h-[25%] border-t-1 border-gray-400 text-xl flex items-center justify-center">
                    <Link className="hover:text-blue-600 font-medium hover:underline" to='/theme-toggler'>Theme Toggler</Link>
                </div>
            </section>

            {/* Toast component preview tab */}
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]">
                <div className="h-[75%] flex items-center justify-center px-2">
                    <div className='relative overflow-hidden py-2 px-4 flex rounded-2xl border-1 border-black justify-center items-center max-w-fit backdrop-blur-lg'>
                        <div>
                            <p className='text-sm font-medium'>The action has been failed due to an error</p>
                            <p className='text-xs'>Please try once again after some time.</p>
                        </div>
                        <button><img src={plus} alt="" className='rotate-45 cursor-pointer ml-8 w-7' /></button>
                        <div
                            className="absolute bottom-0 left-0 h-1 w-full bg-black"
                        />

                    </div>
                </div>
                <div className="h-[25%] border-t-1 border-gray-400 text-xl flex items-center justify-center">
                    <Link className="hover:text-blue-600 font-medium hover:underline" to='/toast'>Toast</Link>
                </div>
            </section>

            {/* Counter component preview tab */}
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]">
                <div className="h-[75%] flex items-center justify-center">
                    <CartCounter currentCount={0}/>
                </div>
                <div className="h-[25%] border-t-1 border-gray-400 text-xl flex items-center justify-center">
                    <Link className="hover:text-blue-600 font-medium hover:underline" to='/counter'>Counter</Link>
                </div>
            </section>



            <section className="h-60 rounded-lg bg-[#9fa0c3a5]"></section>
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]"></section>
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]"></section>
            <section className="h-60 rounded-lg bg-[#9fa0c3a5]"></section>
        </div>
    )
}