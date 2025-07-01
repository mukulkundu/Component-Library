import { useRef } from "react";
import CartCounter from "../CodeModules/CartCounter";
import Clip from "../CodeModules/Clip";


export default function Counter() {

    const counterCode = `
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import { useState } from 'react'

type CartCounterProps = {
  currentCount : number
}

export default function CartCounter({currentCount}: CartCounterProps){

  const [count, setCount] = useState(currentCount);

  const handlePlus = () => {
    setCount(count + 1);
  }

  const handleMinus = () => {
    setCount(count - 1);
  }

  if (count === 0) {
    return(
      <button onClick={handlePlus} className='bg-purple-400 p-3 rounded-lg text-white font-medium cursor-pointer
       hover:shadow-purple-900 hover:shadow-xs'>
        Add to Cart
      </button>
    )
  }

  return(

    <div className='flex items-center justify-center text-2xl gap-2'>
      <button className='cursor-pointer hover:bg-gray-400 m-1 p-1 rounded' onClick={handleMinus}>
      <img src={minus} alt="" /></button>
      <span>{count}</span>
      <button className='cursor-pointer hover:bg-gray-400 m-1 p-1 rounded' onClick={handlePlus}>
      <img src={plus} alt="" /></button>
    </div>
  )
}
    `
    const counterRef = useRef(null)

    const usingCounter = `
<CartCounter currentCount={0} />
    `
    const usingCounterRef = useRef(null)


    return (

        <div className="pt-14 ml-24 dark:text-white">
            <h1 className="text-4xl font-medium">Counter</h1>

            <article className="mt-2 text-sm text-gray-700">
                A simple cart counter that toggles between an “Add to Cart” button and quantity controls (+, -).
            </article>

            <section className="mt-12 bg-gray-200 dark:bg-[#1d1c1c] h-50 rounded-lg flex items-center justify-center w-[50%]">
                <CartCounter currentCount={0} />
            </section>

            <section className="mt-12">
                <h2 className="text-3xl">Usage</h2>
                <article>
                    <ol>
                        <li className="py-4 w-[85%]">
                            <p className='mb-2'>1. Create a New tsx file named CartCounter.tsx and paste the code in it</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] py-4 px-8 text-sm">
                                <pre className="flex items-start justify-between">
                                    <code ref={counterRef}>
                                        {counterCode}
                                    </code>
                                    <div className="mt-2">
                                        <Clip textToCopy={counterRef} />
                                    </div>
                                </pre>
                            </div>
                        </li>

                        <li className="py-4 w-[80%]">
                            <p className='mb-2'>2. Now, import the CartCounter component in your required file and provide the prop currentCount to it, like in the example.</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                <pre className="flex items-center justify-between">
                                    <code className="flex" ref={usingCounterRef}>
                                        {usingCounter}
                                    </code>
                                    <div>
                                        <Clip textToCopy={usingCounterRef} />
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