export const fromTop = {
  hidden: { y: -100 },
  show: {
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { y: -100, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fromRight = {
  hidden: { x: 100 },
  show: {
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { x: 100, transition: { duration: 0.5, ease: "easeOut" } },
};

export const alertLine = {
  hidden: { width: "0%" },
  show: { width: "100%", transition: { duration: 1, delay: 0.5 } },
};

export const height = {
  open: { height: "0rem", transition: { duration: 0.5, ease: "easeOut" } },
  collapsed: {
    height: "15rem",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fromBottom = {
  hidden: { y: 100 },
  show: { y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};
