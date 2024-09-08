'use client'
import NOISE from '@/assets/noise/noise.webp'
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useEffect } from 'react';
const COLORS_TOP = ["#853AC8", "#DCB6F1","#423DF5"];
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
      className="absolute inset-0 w-full h-full opacity-5  rounded-xl"
      style={{
        backgroundImage: `url(${NOISE.src})`,
        backgroundSize: "30%",
      }}
    ></div>
  );
};