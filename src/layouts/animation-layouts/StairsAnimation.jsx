import React from "react";
import { motion } from "framer-motion";

const StairsAnimation = ({ children }) => {
  const anim = (variants, custom) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
      custom,
    };
  };

  const expand = {
    initial: {
      top: 0,
    },
    enter: (i) => ({
      top: "100%",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
      },
      transitionEnd: {
        height: 0,
        top: 0,
      },
    }),
    exit: (i) => ({
      height: "100%",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
      },
    }),
  };

  const overlay = {
    initial: {
      opacity: 0.5,
    },
    enter: {
      opacity: 0,
    },
    exit: {
      opacity: 0.5,
    },
  };

  const numberOfColumns = 6;

  return (
    <div className="relative">
      <motion.div
        {...anim(overlay)}
        className="h-screen w-screen fixed top-0 left-0 pointer-events-none bg-primary z-50"
      />
      <div className="h-screen w-screen fixed top-0 left-0 pointer-events-none flex z-50">
        {[...Array(numberOfColumns)].map((_, i) => {
          return (
            <motion.div
              key={i}
              {...anim(expand, numberOfColumns - i)}
              className="relative h-full w-full bg-primary"
            />
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default StairsAnimation;
