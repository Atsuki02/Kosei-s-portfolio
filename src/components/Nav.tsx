import { useState } from "react";
import { useMediaQuery } from "../util/useMediaQuery";
import { motion } from "framer-motion";
import { slideInFromRightNavVariants } from "../util/motion";

function Nav() {
  const [toggled, setToggled] = useState(false);
  const matches = useMediaQuery("(min-width: 675px)");

  return (
    <>
      {!matches && (
        <div
          onClick={() => setToggled((prev) => !prev)}
          className='space-y-1.5 cursor-pointer z-50'
        >
          <motion.span
            animate={{ rotateZ: toggled ? 405 : 0, y: toggled ? 8 : 0 }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: "easeIn",
            }}
            className='block h-0.5 w-8 bg-black'
          ></motion.span>
          <motion.span
            animate={{ width: toggled ? 0 : 24 }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: "easeIn",
            }}
            className='block h-0.5 w-6 bg-black'
          ></motion.span>
          <motion.span
            animate={{
              rotateZ: toggled ? -405 : 0,
              y: toggled ? -8 : 0,
              width: toggled ? 32 : 16,
            }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: "easeIn",
            }}
            className='block h-0.5 w-4 bg-black'
          ></motion.span>
        </div>
      )}

      {matches && (
        <div>
          <div className='flex justify-between gap-10 text-slate-600 text-xl'>
            <a href='/work'>Work</a>
            <a href='/contact'>Contact</a>
          </div>
        </div>
      )}

      {!matches && toggled && (
        <div className='fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-40'>
          <div className='flex flex-col justify-center items-center gap-10 text-xl w-full'>
            <div className='flex items-center justify-center font-medium'>
              <a href='/'>Home</a>
            </div>
            <div className='flex items-center justify-center font-medium'>
              <a href='/work'>Work</a>
            </div>
            <div className='flex items-center justify-center font-medium'>
              <a href='/contact'>Contact</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
