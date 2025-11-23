const slideInFromLeftVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    filter: "blur(10px)",
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 1.2,
    },
  },
};

const slideInFromRightVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    filter: "blur(10px)",
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 1.2,
    },
  },
};

const slideInFromBottomVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 1.2,
    },
  },
};

const slideInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 1.2,
    },
  },
};

const slideInNavVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8,
      delay: 0.2,
    },
  },
};

const slideOutVariants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
    },
  },
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};

const slideInFromRightNavVariants = {
  hidden: {
    x: 100,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const circleVariants = {
  fadeOut: {
    initial: {
      width: "100vw",
      height: "200dvh",
      top: 0,
      right: 0,
      borderRadius: 0,
      opacity: 1,
    },
    animate: {
      width: 0,
      height: 0,
      borderRadius: "9999px",
      opacity: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.76, 0, 0.24, 1], // Custom bezier for smoother feel
      },
    },
  },
  circleOpen: {
    initial: {
      width: 0,
      height: 0,
      borderRadius: "50%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: 0,
    },
    animate: {
      width: "100vw",
      height: "200vh",
      borderRadius: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
};

export {
  slideInFromLeftVariants,
  slideInFromRightVariants,
  slideInFromBottomVariants,
  slideInVariants,
  slideInNavVariants,
  slideOutVariants,
  slideInFromRightNavVariants,
  circleVariants,
};
