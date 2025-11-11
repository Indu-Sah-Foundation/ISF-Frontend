import React, { useState } from 'react';

const Navbarblack = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    document.body.style.overflow = nav ? 'scroll' : 'hidden';
  };

  return (
    <div className='w-full p-4 fixed top-0 left-0 bg-white z-50'>
  <div className='flex justify-between items-center'>
    <div className='w-32 h-16 overflow-hidden'>
      <img 
        src="isflogo.png" 
        className='w-full h-full object-cover' 
        alt="ISF Logo"
      />
    </div>
    {/* Mobile menu button */}
    <button onClick={handleNav} className='block lg:hidden text-black font-bold text-2xl'>
      {nav ? '✖' : '☰'}
    </button>
    <nav className={`flex lg:flex ${nav ? 'block' : 'hidden'} lg:block`}>
      <ul className={`flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8`}>
        <li className='text-black font-bold text-xl hover:text-gray-400 px-2 py-1 rounded cursor-pointer'>ABOUT US</li>
        <li className='text-black font-bold text-xl hover:text-gray-400 px-2 py-1 rounded cursor-pointer'>PROJECTS</li>
        <li className='text-black font-bold text-xl hover:text-gray-400 px-2 py-1 rounded cursor-pointer'>DONATE</li>
        <li className='text-black font-bold text-xl hover:text-gray-400 px-2 py-1 rounded cursor-pointer'>Leadership</li>
        <li className='text-black font-bold text-xl hover:text-gray-400 px-2 py-1 rounded cursor-pointer'>Letter From Founders</li>
      </ul>
    </nav>
  </div>
</div>

  );
};

export default Navbarblack;