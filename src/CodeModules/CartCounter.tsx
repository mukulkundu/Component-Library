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
      <button onClick={handlePlus} className='bg-purple-400 p-3 rounded-lg text-white font-medium cursor-pointer hover:shadow-purple-900 hover:shadow-xs'>
        Add to Cart
      </button>
    )
  }

  return(

    <div className='flex items-center justify-center text-2xl gap-2'>
      <button className='cursor-pointer hover:bg-gray-400 m-1 p-1 rounded' onClick={handleMinus}><img src={minus} alt="" /></button>
      <span>{count}</span>
      <button className='cursor-pointer hover:bg-gray-400 m-1 p-1 rounded' onClick={handlePlus}><img src={plus} alt="" /></button>
    </div>
  )
}