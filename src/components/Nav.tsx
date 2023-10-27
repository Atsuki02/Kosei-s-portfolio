import { useState } from "react";
import { useMediaQuery } from "../util/useMediaQuery";
import { motion } from "framer-motion";

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
            animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
            className='block h-0.5 w-8 bg-black'
          ></motion.span>
          <motion.span
            animate={{ width: toggled ? 0 : 24 }}
            className='block h-0.5 w-6 bg-black'
          ></motion.span>
          <motion.span
            animate={{
              rotateZ: toggled ? -45 : 0,
              y: toggled ? -8 : 0,
              width: toggled ? 32 : 16,
            }}
            className='block h-0.5 w-4 bg-black'
          ></motion.span>
        </div>
      )}

      {matches && (
        <div>
          <div className='flex justify-between gap-10 text-slate-600 text-xl'>
            <p>Work</p>
            <p>Contact</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
