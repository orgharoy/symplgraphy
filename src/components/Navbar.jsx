import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "@/helpers/navLinks";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, delay, motion } from "framer-motion";
import StaggeredText from "@/components/animated-componenets/StaggeredText";

export default function Navbar() {
  const { setTheme } = useTheme();
  return (
    <nav className="">
      <div className="hidden lg:block">
        <DesktopNav setTheme={setTheme} />
      </div>
      <div className="block lg:hidden">
        <MobileNav setTheme={setTheme} />
      </div>
    </nav>
  );
}

const DesktopNav = ({ setTheme }) => {
  return (
    <div className="flex items-center justify-between px-16 h-16">
      <div>
        <h1 className="cursor-pointer group">symplgraphy</h1>
      </div>
      <div className="flex items-center gap-14">
        {navLinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={({ isActive }) =>
              isActive
                ? "relative flex items-center after:content-[''] after:flex-grow-0 after:block after:absolute after:top-0 after:-right-3 after:h-[6px] after:w-[6px] after:bg-primary after:rounded-full"
                : "text-foreground flex items-center"
            }
          >
            <StaggeredText>{link.name}</StaggeredText>
          </NavLink>
        ))}
        <div className="cursor-pointer relative h-8 w-8 flex items-center">
          <Sun
            className="absolute h-[1.2rem] w-[1.2rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            onClick={() => setTheme("dark")}
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            onClick={() => setTheme("light")}
          />
          <span className="sr-only">Toggle theme</span>
        </div>
      </div>
    </div>
  );
};

const MobileNav = ({ setTheme }) => {
  const [isActive, setIsActive] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
    },
  ];

  const variants = {
    open: {
      width: "75vw",
      height: "85vh",
      top: -8,
      right: -8,
      padding: 40,
      transition: { duration: 0.75, ease: [0.75, 0, 0.24, 1] },
    },
    closed: {
      width: 0,
      height: 0,
      top: 3,
      right: 4,
      padding: 0,
      transition: { duration: 0.75, delay: 1, ease: [0.75, 0, 0.24, 1] },
    },
  };

  const perspective = {
    initial: { opacity: 0, translateX: 10 },
    enter: (i) => ({
      opacity: 1,
      translateX: 0,
      transition: {
        duration: 0.65,
        delay: 0.7 + i * 0.2,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: (i) => ({
      opacity: 0,
      translateX: 10,
      transition: {
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1],
        delay: i * 0.2, // Optional: delay for each item to exit one by one
      },
    }),
  };

  const socialsAnimation = {
    initial: { opacity: 0, translateX: 10 },
    enter: (i) => ({
      opacity: 1,
      translateX: 0,
      transition: {
        duration: 0.65,
        delay: 1.2 + i * 0.2,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: (i) => ({
      opacity: 0,
      translateX: 10,
      transition: {
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1],
        delay: i * 0.2,
      },
    }),
  };

  const themeIcon = {
    initial: { opacity: 0, translateX: 10 },
    enter: {
      opacity: 1,
      translateX: 0,
      transition: {
        duration: 0.65,
        delay: 1.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
    exit: {
      opacity: 0,
      translateX: 10,
      transition: {
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <div className="flex items-center justify-between px-5 h-16">
      <h1 className="cursor-pointer group">symplgraphy</h1>

      <div className="flex items-center relative z-10">
        <div
          className="relative h-8 w-16 flex items-center rounded-[16px] cursor-pointer overflow-hidden text-sm z-10"
          onClick={() => setIsActive(!isActive)}
        >
          <motion.div
            className="relative h-full w-full"
            animate={{ top: isActive ? "-100%" : "0" }}
            transition={{ duration: 0.5, ease: [0.75, 0, 0.24, 1] }}
          >
            <div className="capitalize w-full h-full bg-[#c9fd74] flex items-center justify-center">
              <StaggeredText className="text-sm">Menu</StaggeredText>
            </div>
            <div className="capitalize w-full h-full absolute top-full bg-foreground flex items-center justify-center">
              <StaggeredText className="text-background text-sm">
                Close
              </StaggeredText>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={variants}
          animate={isActive ? "open" : "closed"}
          initial="closed"
          className="absolute top-0 right-0 rounded-[20px] bg-[#c9fd74] flex flex-col"
        >
          <div className="flex-grow flex flex-col justify-center gap-3">
            <AnimatePresence>
              {isActive &&
                navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={perspective}
                    animate="enter"
                    exit="exit"
                    initial="initial"
                    custom={index}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => (isActive ? "" : "")}
                    >
                      <StaggeredText className="font-extrabold text-3xl md:text-5xl">
                        {link.name}
                      </StaggeredText>
                    </NavLink>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          <div className="flex justify-between items-end md:items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 md:gap-y-2">
              <AnimatePresence>
                {isActive &&
                  socialLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      variants={socialsAnimation}
                      animate="enter"
                      exit="exit"
                      initial="initial"
                      custom={index}
                      onClick={() => setIsActive(!isActive)}
                      className="mb-0 pb-0"
                    >
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-0 pb-0 inline-block leading-none align-bottom"
                      >
                        <StaggeredText className="md:font-semibold">
                          {link.name}
                        </StaggeredText>
                      </a>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  variants={themeIcon}
                  animate="enter"
                  exit="exit"
                  initial="initial"
                  onClick={() => setIsActive(!isActive)}
                  className="cursor-pointer relative h-5 w-5 md:h-7 md:w-7 flex items-center"
                >
                  <Sun
                    className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    onClick={() => setTheme("dark")}
                  />
                  <Moon
                    className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    onClick={() => setTheme("light")}
                  />
                  <span className="sr-only">Toggle theme</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
