import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import StairsAnimation from "@/layouts/animation-layouts/StairsAnimation";

import Navbar from "@/components/Navbar";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="relative">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <StairsAnimation key={location.pathname}>
          <Outlet />
        </StairsAnimation>
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
