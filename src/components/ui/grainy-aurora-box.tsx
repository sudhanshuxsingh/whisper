'use client'
import NOISE from '@/assets/noise/noise.webp'
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useEffect } from 'react';
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const GrainyAuroraBox = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(155% 155% at 50% 100%, #020202 30%, ${color})`;
  return (
    <motion.div className="hidden relative rounded-2xl md:block h-[95vh] my-auto lg:col-span-2" style={{
          backgroundImage
      }}>
        <Noise/>
    </motion.div>
  )
}
export default GrainyAuroraBox
const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full opacity-10  rounded-xl"
      style={{
        backgroundImage: `url(${NOISE.src})`,
        backgroundSize: "30%",
      }}
    ></div>
  );
};


//
            // background:"radial-gradient(219.12% 110.92% at 50% 102.84%, #020202 31.71%, #1F0C3E 47.92%, #522191 66.28%, #853AC8 77.24%, #DCB6F1 100%)",