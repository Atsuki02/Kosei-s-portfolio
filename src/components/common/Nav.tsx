import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../../library/useMediaQuery";

const menuItems = [
  { title: "Home", href: "/", number: "01" },
  { title: "Work", href: "/work", number: "02" },
  { title: "Contact", href: "/contact", number: "03" },
];

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const menuListVariants = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const menuItemVariants = {
  initial: {
    y: "30%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
  exit: {
    y: "30%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
};

function Nav() {
  const [toggled, setToggled] = useState(false);
  const matches = useMediaQuery("(min-width: 675px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (toggled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggled]);

  return (
    <>
      {/* Mobile Menu Button Placeholder for Layout */}
      {!matches && <div className='w-8 h-5 relative invisible'></div>}

      {/* Actual Mobile Menu Button (Portaled to be on top of everything) */}
      {!matches &&
        mounted &&
        createPortal(
          <div className='fixed top-0 right-0 z-[70] h-24 md:h-32 px-6 md:px-12 flex items-center justify-end pointer-events-none w-full max-w-[100vw]'>
            <div
              onClick={() => setToggled((prev) => !prev)}
              className='space-y-1.5 cursor-pointer pointer-events-auto relative group'
            >
              <motion.span
                animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
                className={`block h-0.5 w-8 transition-colors duration-300 ${
                  toggled ? "bg-white" : "bg-white group-hover:bg-gray-300"
                }`}
              ></motion.span>
              <motion.span
                animate={{ width: toggled ? 0 : 24 }}
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  toggled ? "" : "w-6 group-hover:w-8 group-hover:bg-gray-300"
                }`}
              ></motion.span>
              <motion.span
                animate={{
                  rotateZ: toggled ? -45 : 0,
                  y: toggled ? -8 : 0,
                  width: toggled ? 32 : 16,
                }}
                className={`block h-0.5 transition-all duration-300 ${
                  toggled
                    ? "bg-white w-8"
                    : "w-4 bg-white group-hover:w-8 group-hover:bg-gray-300"
                }`}
              ></motion.span>
            </div>
          </div>,
          document.body
        )}

      {matches && (
        <div className='flex items-center gap-10 text-sm uppercase tracking-[0.24em] text-white mix-blend-difference font-light'>
          <a
            href='/work'
            className='hover:text-gray-300 transition-colors duration-300 relative group'
          >
            Work
            <span className='absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full'></span>
          </a>
          <a
            href='/contact'
            className='hover:text-gray-300 transition-colors duration-300 relative group'
          >
            Contact
            <span className='absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full'></span>
          </a>
        </div>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {!matches && toggled && (
              <motion.div
                variants={containerVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center items-center'
              >
                {/* Background Elements for Atmosphere */}
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                  <div className='absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] opacity-40'></div>
                  <div className='absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] opacity-40'></div>
                </div>

                <motion.div
                  variants={menuListVariants}
                  className='flex flex-col gap-8 w-full max-w-md px-8 relative z-10'
                >
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={menuItemVariants}
                      className='overflow-hidden'
                    >
                      <a
                        href={item.href}
                        className='group flex items-baseline gap-6 text-white no-underline'
                        onClick={() => setToggled(false)}
                      >
                        <span className='text-xs text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0 transform'>
                          {item.number}
                        </span>
                        <span className='text-5xl md:text-6xl font-thin uppercase tracking-widest hover:text-gray-300 transition-colors duration-300 hover:italic'>
                          {item.title}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.8, duration: 0.5 },
                  }}
                  exit={{ opacity: 0 }}
                  className='absolute bottom-12 left-0 w-full text-center text-xs text-gray-500 tracking-[0.3em] uppercase font-light'
                >
                  Kosei Kitada — Portfolio
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default Nav;
