import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const textAnimationFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
};

const heroSlides = [
  {
    title: "Share Food, Spread Love 🍽",
    desc: "PlateShare helps you donate surplus meals, reduce food waste, and support people who need it most — all with one simple step.",
    image: "https://i.ibb.co.com/Kcm6WBj1/Screenshot-34.png",
  },
  {
    title: "Turn Extra Meals Into Hope ✨",
    desc: "Every shared meal can brighten someone’s day — PlateShare connects your surplus food with people who truly need it.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  },
  {
    title: "Reduce Waste, Help Communities 🤝",
    desc: "Together we can minimize food waste and support families, creating a stronger and more caring community.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
];

const HeroSection = () => {
  return (
    <div>
      <section className="m-20 w-full mx-auto relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-xl overflow-hidden"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  className="mx-auto w-full rounded-2xl h-[56vh] object-cover"
                  src={slide.image}
                  alt={`slide-${index}`}
                />

                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 
bg-gradient-to-b from-black/40 via-black/30 to-black/60 rounded-xl"
                >
                  <motion.h1
                    variants={textAnimationFromTop}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl md:text-4xl font-bold text-white mb-4"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    variants={textAnimationFromTop}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6, duration: 1.8 }}
                    className="text-lg md:text-lg text-amber-200 dark:text-amber-300 max-w-xl mb-6"
                  >
                    {slide.desc}
                  </motion.p>
                  <motion.div
                    variants={textAnimationFromTop}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.6 }}
                    className="flex gap-4"
                  >
                    <Link
                      to="/availableFoods"
                      className="btn bg-amber-400 hover:bg-amber-200 dark:bg-amber-600 dark:hover:bg-amber-500 font-bold px-6"
                    >
                      View All Foods
                    </Link>
                    <Link
                      to="/availableFoods"
                      className="btn bg-amber-50 hover:bg-amber-300 dark:bg-amber-900 dark:hover:bg-amber-700 dark:text-amber-200 text-black px-6"
                    >
                      Search Food
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};
export default HeroSection;
