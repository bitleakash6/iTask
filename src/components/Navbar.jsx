import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between text-white bg-stone-900 py-3'>
        <div className="logo ">
            <span className='mx-9 p-2 font-bold'>iTask</span>
        </div>
        <ul className='flex gap-5 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Todos</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar