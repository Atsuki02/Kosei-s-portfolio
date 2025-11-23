import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiInstagram, FiMail } from "react-icons/fi";
import { useMediaQuery } from "../../library/useMediaQuery";

const menuItems = [
  { title: "Home", href: "/", number: "01" },
  { title: "Work", href: "/work", number: "02" },
  { title: "Contact", href: "/contact", number: "03" },
];

const overlayVariants = {
  initial: {
    clipPath: "inset(0 0 100% 0)",
  },
  animate: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(100% 0 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const linkVariants = {
  initial: { y: "100%" },
  animate: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1 * i,
    },
  }),
  exit: (i: number) => ({
    y: "100%",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1 * i,
    },
  }),
};

function Nav() {
  const [toggled, setToggled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
      {/* Desktop Navigation */}
      {isDesktop && mounted && (
        <div className='flex items-center gap-12 text-sm uppercase tracking-[0.2em] text-black font-light mix-blend-difference'>
          <a
            href='/work'
            className='text-white hover:text-gray-300 transition-colors duration-300 relative group cursor-none'
          >
            Work
            <span className='absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full'></span>
          </a>
          <a
            href='/contact'
            className='text-white hover:text-gray-300 transition-colors duration-300 relative group cursor-none'
          >
            Contact
            <span className='absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full'></span>
          </a>
          {/* Desktop Icons - Simplified */}
          <div className='flex gap-6 ml-4 border-l border-white/30 pl-10'>
            <a
              href='https://instagram.com/koseikitada'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white hover:text-gray-300 transition-colors duration-300 text-lg cursor-none'
              aria-label='Instagram'
            >
              <FiInstagram />
            </a>
            <a
              href='mailto:hello@koseikitada.com'
              className='text-white hover:text-gray-300 transition-colors duration-300 text-lg cursor-none'
              aria-label='Email'
            >
              <FiMail />
            </a>
          </div>
        </div>
      )}

      {/* Mobile Menu Trigger Button */}
      {!isDesktop &&
        mounted &&
        createPortal(
          <div className='fixed top-0 right-0 z-[70] h-24 px-6 flex items-center justify-end pointer-events-none w-full mix-blend-difference'>
            <button
              onClick={() => setToggled((prev) => !prev)}
              className='pointer-events-auto flex items-center gap-4 group cursor-pointer'
              aria-label='Toggle Menu'
            >
              <span className='text-white text-sm font-light tracking-[0.2em] uppercase hidden md:block overflow-hidden'>
                <motion.span
                  className='block'
                  animate={{ y: toggled ? -20 : 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  Menu
                </motion.span>
              </span>

              <div className='relative w-8 h-4 flex flex-col justify-center'>
                <motion.span
                  className='absolute left-0 top-1/2 h-[1px] w-full bg-white -translate-y-1/2'
                  animate={{
                    y: toggled ? 0 : -7,
                    rotate: toggled ? 45 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.span
                  className='absolute right-0 top-1/2 h-[1px] bg-white -translate-y-1/2'
                  animate={{
                    width: toggled ? 0 : "60%",
                    opacity: toggled ? 0 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.span
                  className='absolute left-0 top-1/2 h-[1px] w-full bg-white -translate-y-1/2'
                  animate={{
                    y: toggled ? 0 : 7,
                    rotate: toggled ? -45 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>
            </button>
          </div>,
          document.body
        )}

      {/* Fullscreen Menu Overlay */}
      {mounted &&
        createPortal(
          <AnimatePresence mode='wait'>
            {toggled && (
              <motion.div
                variants={overlayVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-0 bg-white z-[60] flex flex-col justify-center items-center text-black'
              >
                <div className='w-full max-w-[90vw] px-6 flex flex-col justify-between items-start h-full py-24'>
                  {/* Menu List - More Compact */}
                  <div className='flex flex-col gap-6 mt-20'>
                    {menuItems.map((item, i) => (
                      <div key={item.title} className='overflow-hidden'>
                        <motion.div
                          custom={i}
                          variants={linkVariants}
                          initial='initial'
                          animate='animate'
                          exit='exit'
                        >
                          <a
                            href={item.href}
                            onClick={() => setToggled(false)}
                            className='group flex items-baseline gap-6 text-6xl font-thin uppercase tracking-tighter hover:italic transition-all duration-500 cursor-pointer leading-[1.1]'
                          >
                            <span className='text-xs font-mono text-gray-400 -translate-y-4'>
                              {item.number}
                            </span>
                            <span className='relative overflow-hidden'>
                              <span className='block transition-transform duration-500 group-hover:-translate-y-full font-serif italic'>
                                {item.title}
                              </span>
                              <span className='absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0 font-sans text-gray-300'>
                                {item.title}
                              </span>
                            </span>
                          </a>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Info in Menu - Aligned and Minimal */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.5, duration: 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                    className='flex flex-col gap-12 text-gray-400 font-mono text-xs tracking-widest uppercase text-right w-full pb-4'
                  >
                    <div className='flex flex-col gap-4 items-end'>
                      <div className='flex gap-8 text-xl'>
                        <a
                          href='https://instagram.com/koseikitada'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-black hover:text-gray-500 transition-colors duration-300 cursor-pointer'
                          aria-label='Instagram'
                        >
                          <FiInstagram />
                        </a>
                        <a
                          href='mailto:hello@koseikitada.com'
                          className='text-black hover:text-gray-500 transition-colors duration-300 cursor-pointer'
                          aria-label='Email'
                        >
                          <FiMail />
                        </a>
                      </div>
                    </div>

                    <div className='mt-auto'>
                      <p>&copy; 2025 Kosei Kitada. All Rights Reserved.</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default Nav;
