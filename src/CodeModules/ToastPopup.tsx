import { memo, useEffect, useState } from 'react'
import plus from '../assets/plus.svg'
import plusDarkMode from '../assets/plusdarkmode.svg'

type ToastPopupProps = {
    mainMsg : string,
    subMsg : string,
}

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
    console.log('renering component')


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