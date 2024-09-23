"use client"
import React from 'react';
import Image from 'next/image';
import { FacebookOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#543310] py-2 px-2 sm:px-4 md:px-4 lg:px-19 xl:px-8 flex justify-between items-center">
  {/* Left side: Logo */}
  <div className="flex items-center">
    <Image
      src="/logo.svg"
      alt="Logo"
      width={75}
      height={60.27}
      className="rounded-full"
    />
    <h1 className="text-white text-lg sm:text-xl md:text-2xl ml-3 font-bold">WARπ</h1>
  </div>

  {/* Right side: Sign In, Sign Up */}
  <div className="flex items-center space-x-4">
    <a href="/login" className="text-white text-sm sm:text-base">
      sign in
    </a>
    <a
      href="/register"
      className="bg-[#D6A074] text-white text-sm sm:text-base px-4 py-2 rounded-full hover:bg-[#A67B5B]"
    >
      sign up
    </a>
  </div>
</nav>


      {/* About Us Section */}
      <section className="text-center py-8 sm:py-12">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">About Us</h2>
  <p className="max-w-xl mx-auto mb-4 sm:mb-6">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </p>
  <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
    {/* First Card */}
    <div className="w-full sm:w-1/3 group hover:scale-105 transition-transform duration-300">
      <div className="relative overflow-hidden rounded-full w-32 h-32 mx-auto">
        <Image src="/roundedKopi.svg" alt="Coffee" layout="fill" objectFit="cover" className="rounded-full" />
      </div>
      <p className="mt-4 text-sm sm:text-base max-w-xs mx-auto">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
      </p>
    </div>

    {/* Second Card */}
    <div className="w-full sm:w-1/3 group hover:scale-105 transition-transform duration-300">
      <div className="relative overflow-hidden rounded-full w-32 h-32 mx-auto">
        <Image src="/roundedKopi.svg" alt="Coffee" layout="fill" objectFit="cover" className="rounded-full" />
      </div>
      <p className="mt-4 text-sm sm:text-base max-w-xs mx-auto">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
      </p>
    </div>
  </div>
</section>


      {/* Fun Fact Section */}
      <section className="py-8 sm:py-12 bg-gray-100 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Fun Fact</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Image src="/kopi.svg" alt="Fun Fact" width={100} height={100} />
          <p className="max-w-md text-sm sm:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
      </section>

      {/* Best Food Section */}
      <section className="py-8 sm:py-12">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">Best Food</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto">
      <Image src="/makanan.svg" alt="Coffee" width={250} height={200} className="rounded-md" />
      <h3 className="mt-4 text-lg font-bold">satay</h3>
      <p className="text-sm">Rp139.900</p>
      <p className="text-sm text-gray-500">4rb+ sold</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto">
      <Image src="/makanan.svg" alt="Satay" width={250} height={200} className="rounded-md" />
      <h3 className="mt-4 text-lg font-bold">Satay</h3>
      <p className="text-sm">Rp139.900</p>
      <p className="text-sm text-gray-500">4rb+ sold</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto">
      <Image src="/makanan.svg" alt="Noodles" width={250} height={200} className="rounded-md" />
      <h3 className="mt-4 text-lg font-bold">satay</h3>
      <p className="text-sm">Rp129.900</p>
      <p className="text-sm text-gray-500">3rb+ sold</p>
    </div>
  </div>
</section>


      {/* Best Coffee & Drink Section */}
      <section className="py-8 sm:py-12 bg-gray-100">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">Best Coffee & Drink</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto">
      <Image src="/templateKopi.svg" alt="Coffee Latte" width={250} height={200} className="rounded-md" />
      <h3 className="mt-4 text-lg font-bold">coffe</h3>
      <p className="text-sm">Rp139.900</p>
      <p className="text-sm text-gray-500">4rb+ sold</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto">
      <Image src="/templateKopi.svg" alt="Satay" width={250} height={200} className="rounded-md" />
      <h3 className="mt-4 text-lg font-bold">Coffe</h3>
      <p className="text-sm">Rp139.900</p>
      <p className="text-sm text-gray-500">4rb+ sold</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto">
      <Image src="/templateKopi.svg" alt="Iced Americano" width={250} height={200} className="rounded-md" />
      <h3 className="mt-4 text-lg font-bold">Coffe</h3>
      <p className="text-sm">Rp119.900</p>
      <p className="text-sm text-gray-500">2rb+ sold</p>
    </div>
  </div>
</section>
      {/* Footer */}
      <footer className="bg-[#543310] text-white py-6 sm:py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-col justify-center items-center gap-6">
      {/* Social Media Links */}
      <div className="flex gap-6">
        {/* Facebook Section */}
        <a href="#" className="flex items-center gap-2">
          <FacebookOutlined style={{ fontSize: '20px', color: 'white' }} />
          <span className="text-white">Facebook</span>
        </a>

        {/* Instagram Section */}
        <a href="#" className="flex items-center gap-2">
          <InstagramOutlined style={{ fontSize: '20px', color: 'white' }} />
          <span className="text-white">Instagram</span>
        </a>

        {/* Phone Section */}
        <a href="tel:+621024089088" className="flex items-center gap-2">
          <PhoneOutlined style={{ fontSize: '20px', color: 'white' }} />
          <span className="text-white">+621024089088</span>
        </a>
      </div>
    </div>
  </div>
</footer>
    </>
  );
};

export default Home;
