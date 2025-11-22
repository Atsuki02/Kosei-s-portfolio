import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../library/useMediaQuery";

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
            className='block h-0.5 w-8 bg-white'
          ></motion.span>
          <motion.span
            animate={{ width: toggled ? 0 : 24 }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: "easeIn",
            }}
            className='block h-0.5 w-6 bg-white'
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
            className='block h-0.5 w-4 bg-white'
          ></motion.span>
        </div>
      )}

      {matches && (
        <div className='flex items-center gap-10 text-sm uppercase tracking-[0.24em] text-white mix-blend-difference'>
          <a href='/work' className='hover-underline-animation'>
            Work
          </a>
          <a href='/contact' className='hover-underline-animation'>
            Contact
          </a>
        </div>
      )}

      {!matches && toggled && (
        <>
          <div className='fixed inset-0 flex justify-center items-center bg-black/95 z-40 backdrop-blur'>
            <div className='flex flex-col justify-center items-center gap-10 text-lg w-full text-white uppercase tracking-[0.28em]'>
              <div className='flex items-center justify-center font-medium hover-underline-animation'>
                <a href='/'>Home</a>
              </div>
              <div className='flex items-center justify-center font-medium hover-underline-animation'>
                <a href='/work'>Work</a>
              </div>
              <div className='flex items-center justify-center font-medium hover-underline-animation'>
                <a href='/contact'>Contact</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Nav;
