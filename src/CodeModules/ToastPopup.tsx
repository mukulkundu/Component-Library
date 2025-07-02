import { memo, useEffect, useState } from 'react'
import plus from '../assets/plus.svg'
import plusDarkMode from '../assets/plusdarkmode.svg'

type ToastPopupProps = {
    mainMsg : string,
    subMsg : string,
}

/*
This function takes a main message(mainMsg) and a sub message(subMsg) as string in it as props which are then used to show it in the Toast on the screen.
It uses a useState isVisible which is used to set the popup element as visible or not based on its boolean value.
Also it uses a setTimeout which changes the value of the isVisible useState to false that enables it to disappear it after 5 sec.
*/
function ToastPopup({mainMsg, subMsg}: ToastPopupProps) {

    const [isVisible, setIsVisible] = useState(true);

    const closePopup = () => {
        setIsVisible(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000);
        return () => clearTimeout(timer)  //clear timeout on unmount
    }, [])



    /*
    This component displays the toast whenever the value of the useState isVisible is true and disappears when the value is false.
    */
    return (

        <>
            {isVisible && <div className="z-40 fixed top-8 left-1/2 -translate-x-1/2 pointer-events-auto transition-all ease-in-out duration-500">
                <div className='relative overflow-hidden p-4 flex rounded-2xl border-1 border-black dark:border-white justify-center items-center max-w-fit backdrop-blur-2xl'>
                    <div>
                        <p className='text-lg font-medium'>{mainMsg}</p>
                        <p className='text-sm'>{subMsg}</p>
                    </div>
                    <button onClick={closePopup}><img src={plus} alt="" className='rotate-45 cursor-pointer ml-8 w-7 dark:hidden' /><img src={plusDarkMode} alt="" className='rotate-45 cursor-pointer ml-8 w-7 hidden dark:inline-block' /></button>
                    <div
                        className="absolute bottom-0 left-0 h-1 w-full bg-black dark:bg-white"
                        style={{
                            animation: 'shrinkBar 5s linear forwards',
                        }}
                    />
                    <style>
                        {`
                        @keyframes shrinkBar {
                          0% { width: 100%; }
                       100% { width: 0%; }
                        }
                    `}
                    </style>

                </div>
            </div>}
        </>
    )
}

export default memo(ToastPopup);