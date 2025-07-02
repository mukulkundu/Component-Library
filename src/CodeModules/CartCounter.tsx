import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import { useState } from 'react'

type CartCounterProps = {
  currentCount : number
}

/* 
This function takes the currentCount as input and then updates in the useState count, the functions handlePlus increase the count with 1 and handleMinus decrease the count with 1.
*/
export default function CartCounter({currentCount}: CartCounterProps){

  const [count, setCount] = useState(currentCount);

  const handlePlus = () => {
    setCount(count + 1);
  }

  const handleMinus = () => {
    setCount(count - 1);
  }

  /*
  This if condition state that if the count is 0 then this Add to Cart button will be returned but if not then only the count value and plus, minus buttons will be returned as stated in the return.
  */
  if (count === 0) {
    return(
      <button onClick={handlePlus} className='bg-purple-400 p-3 rounded-lg text-white font-medium cursor-pointer hover:shadow-purple-900 hover:shadow-xs'>
        Add to Cart
      </button>
    )
  }

  /*
  This component conditionally renders either the Add to Cart button or the default div with count and buttons, based on the value in the useState count.
  */
  return(

    <div className='flex items-center justify-center text-2xl gap-2'>
      <button className='cursor-pointer hover:bg-gray-400 m-1 p-1 rounded' onClick={handleMinus}><img src={minus} alt="" /></button>
      <span>{count}</span>
      <button className='cursor-pointer hover:bg-gray-400 m-1 p-1 rounded' onClick={handlePlus}><img src={plus} alt="" /></button>
    </div>
  )
}