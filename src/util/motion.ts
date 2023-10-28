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

export {
  slideInFromLeftVariants,
  slideInFromRightVariants,
  slideInFromBottomVariants,
  slideInVariants,
};
