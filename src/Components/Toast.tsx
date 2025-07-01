import { useRef, useState } from 'react'
import plus from '../assets/plus.svg'
import plusDarkMode from '../assets/plusdarkmode.svg'
import Clip from '../CodeModules/Clip'
import ToastPopup from '../CodeModules/ToastPopup'


export default function Toast() {

    const toastCode = `import { useEffect, useState } from 'react'
import plus from '../assets/plus.svg'

type ToastPopupProps = {
    mainMsg : string,
    subMsg : string,
}

export default function ToastPopup({mainMsg, subMsg}: ToastPopupProps) {

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


    return (

        <>
            {isVisible && <div className="z-40 fixed top-8 left-1/2 -translate-x-1/2 pointer-events-auto
             transition-all ease-in-out duration-500">
                <div className='relative overflow-hidden p-4 flex rounded-2xl border-1 border-black
                 justify-center items-center max-w-fit backdrop-blur-lg'>
                    <div>
                        <p className='text-lg font-medium'>{mainMsg}</p>
                        <p className='text-sm'>{subMsg}</p>
                    </div>
                    <button onClick={closePopup}><img src={plus} alt="" className='rotate-45
                     cursor-pointer ml-8 w-7' /></button>
                    <div
                        className="absolute bottom-0 left-0 h-1 w-full bg-black"
                        style={{
                            animation: 'shrinkBar 5s linear forwards',
                        }}
                    />
                    <style>
                        {
                        @keyframes shrinkBar {
                          0% { width: 100%; }
                       100% { width: 0%; }
                        }
                    }
                    </style>

                </div>
            </div>}
        </>
    )
}`
    const toastRef = useRef(null)

    const usingToast = `
<ToastPopup mainMsg={'The action has been failed due to an error'} subMsg={'Please try once again after some time.'}/>
    `
    const usingToastRef = useRef(null)

    const [hello, setHello] = useState(0);
    console.log('rendering parent');
    


    return (
        
        <div className="pt-14 ml-24 dark:text-white">
            <button onClick={()=>{setHello(hello+1)}}>hello</button>
            <ToastPopup mainMsg={'The action has been failed due to an error'} subMsg={'Please try once again after some time.'}/>
            <h1 className="text-4xl font-medium">Toast</h1>

            <article className="mt-2 text-sm text-gray-700">
                A message that is displayed temporarily.
            </article>

            <section className="mt-12 bg-gray-200 dark:bg-[#1d1c1c] h-50 rounded-lg flex items-center justify-center w-[50%]">
                
                <div className='relative overflow-hidden p-4 flex rounded-2xl border-1 border-black dark:border-white justify-center items-center max-w-fit backdrop-blur-lg'>
                    <div>
                        <p className='text-lg font-medium'>The action has been failed due to an error</p>
                        <p className='text-sm'>Please try once again after some time.</p>
                    </div>
                    <button><img src={plus} alt="" className='rotate-45 cursor-pointer ml-8 w-7 dark:hidden' /><img src={plusDarkMode} alt="" className='rotate-45 cursor-pointer ml-8 w-7 hidden dark:inline-block' /></button>
                    <div
                        className="absolute bottom-0 left-0 h-1 w-full bg-black dark:bg-white"
                    />

                </div>

            </section>


            <section className="mt-12">
                <h2 className="text-3xl">Usage</h2>
                <article>
                    <ol>
                        <li className="py-4 w-[85%]">
                            <p className='mb-2'>1. Create a New tsx file named ToastPopup.tsx and paste the code in it</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] py-4 px-8 text-sm">
                                <pre className="flex items-start justify-between">
                                    <code ref={toastRef}>
                                        {toastCode}
                                    </code>
                                    <div className="mt-2">
                                        <Clip textToCopy={toastRef} />
                                    </div>
                                </pre>
                            </div>
                        </li>

                        <li className="py-4 w-[85%]">
                            <p className='mb-2'>2. Now, import the ToastPopup component in your required file and provide the prop it's main text and sub text to show in it, like in the example.</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                <pre className="flex items-center justify-between">
                                    <code className="flex" ref={usingToastRef}>
                                        {usingToast}
                                    </code>
                                    <div>
                                        <Clip textToCopy={usingToastRef} />
                                    </div>
                                </pre>
                            </div>
                        </li>

                    </ol>
                </article>
            </section>




        </div>
    )
}