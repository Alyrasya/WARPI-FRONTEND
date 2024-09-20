import React from 'react';
import Image from 'next/image';

const Page = () => {
  return (
    <>
         <nav className="bg-[#543310] py-4 px-6 sm:px-8 md:px-16 lg:px-32 xl:px-48 flex items-center justify-between">
  {/* Left side: Logo */}
  <div className="flex items-center">
    <Image
      src="/logo.svg"
      alt="Logo"
      width={40}
      height={40}
      className="rounded-full"
    />
    <h1 className="text-white text-lg sm:text-xl md:text-2xl ml-3 font-bold">WARp</h1>
  </div>

  {/* Right side: Navigation and Cart */}
  <div className="flex items-center space-x-4">
    <a href="/" className="text-white text-sm sm:text-base hover:text-[#D6A074]">
      Home
    </a>
    <a href="/history" className="text-white text-sm sm:text-base hover:text-[#D6A074]">
      History
    </a>
    <a
      href="/cart"
      className="bg-[#A67B5B] text-white text-sm sm:text-base px-4 py-2 rounded-full hover:bg-[#D6A074]"
    >
      Keranjang
    </a>
  </div>
</nav>
    </>
  );
}

export default Page;