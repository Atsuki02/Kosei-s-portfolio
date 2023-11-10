const slideInFromLeftVariants = {
  hidden: {
    opacity: 0,
    x: -100,
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeIn",
    },
  },
};
const slideInFromRightVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

const slideInFromBottomVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

const slideInVariants = {
  hidden: {
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

const slideInNavVariants = {
  hidden: {
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeIn",
      delay: 0.5,
    },
  },
};

const slideOutVariants = {
  show: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

const slideInFromRightNavVariants = {
  hidden: {
    x: 200,
    transition: {
      type: "tween",
    },
  },
  show: {
    x: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
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
        ease: "linear",
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
