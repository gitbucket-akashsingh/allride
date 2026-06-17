import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import hero1 from "/src/assets/images/hero1.png";
import hero2 from "/src/assets/images/hero2.png";
import hero3 from "/src/assets/images/hero3.png";

const slides = [
  {
    image: hero1,
    title: "Book Rides Instantly",
    subtitle: "Fast, secure and affordable rides with AllRide",
  },
  {
    image: hero2,
    title: "Drive & Earn",
    subtitle: "Join AllRide as a driver partner",
  },
  {
    image: hero3,
    title: "Live Ride Tracking",
    subtitle: "Track rides in real-time with GPS support",
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[90vh]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>

                <p className="text-xl max-w-2xl">{slide.subtitle}</p>

                {/* <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition">
                  Get Started
                </button> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
