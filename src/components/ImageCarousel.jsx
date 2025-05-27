import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/assets/antImages/ant1.jpg',
  '/assets/antImages/ant4.jpg',
  '/assets/antImages/ant5.jpg',
  '/assets/antImages/ant6.jpg',
  '/assets/antImages/ant7.jpg',
  '/assets/antImages/ant8.jpg',

];

const ImageCarousel = () => {
  return (
    <div className="h-full w-full flex items-center justify-center px-10 py-8 bg-[#f6f6fa]">
      <div className="relative w-full max-w- h-[80vh] rounded-xl overflow-hidden shadow-xl">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Optional caption overlay */}
              <div className="absolute bottom-6 left-6 text-white drop-shadow-md">
                <h2 className="text-xl font-semibold">Discover your destination</h2>
                <p className="text-sm">The fastest way to explore the world</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev-custom absolute top-1/2 left-3 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg cursor-pointer">
          <ChevronLeft className="text-gray-600 w-5 h-5" />
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 right-3 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg cursor-pointer">
          <ChevronRight className="text-gray-600 w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
