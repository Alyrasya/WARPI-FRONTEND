"use client";
import { Carousel } from 'antd';
import React, { useEffect, useRef } from 'react';

export default function Banner() {
  const carouselRef = useRef<any>(null); // Create a reference for the Carousel
  const totalSlides = 2; // Adjust this based on the number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next(); // Move to the next slide
      }
    }, 1000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="bg-beige-200 text-center py-10">
      <Carousel dots={true} ref={carouselRef}>
        <div>
          <img src="/banner.svg" alt="Promo 1" className="mx-auto w-1/2" />
          <h2 className="text-5xl font-bold">BELI 1 GRATIS 1</h2>
          <p className="mt-4">ONLY FOR YOU</p>
          <p className="mt-2">August 29, 2018 | 4:30 - 6:00 PM | Room 204</p>
        </div>
        <div>
          <img src="/banner.svg" alt="Promo 2" className="mx-auto w-1/2" />
          <h2 className="text-5xl font-bold">SPECIAL DISCOUNT</h2>
          <p className="mt-4">LIMITED TIME OFFER</p>
          <p className="mt-2">September 1, 2018 | 10:00 - 12:00 PM | Room 205</p>
        </div>
        {/* Add more slides as needed */}
      </Carousel>
    </div>
  );
}
