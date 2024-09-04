"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineHome, HiMenuAlt2 } from "react-icons/hi";
import Box from "./Box";
import ListItem from "./ListItem";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHomeClick = () => {
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex w-full h-full fixed">
      <div
        className={`${
          isExpanded ? "w-[220px]" : "w-[105px]"
        } flex flex-col gap-y-2 bg-white h-full px-2 pt-2 pb-1 transition-width duration-200`}
      >
        <Box>
          <div className="flex justify-between items-center py-3 px-2">
            <button
              onClick={handleHomeClick}
              className="flex justify-center items-center w-11 h-11 bg-transparent rounded-full hover:bg-neutral-600/35 transition duration-200"
            >
              <HiOutlineHome className="text-4xl text-white" />
            </button>
            <button
              onClick={toggleSidebar}
              className="flex justify-center items-center w-11 h-11 bg-transparent rounded-full hover:bg-neutral-600/35 transition duration-200"
            >
              <HiMenuAlt2 className="text-4xl text-white" />
            </button>
          </div>
        </Box>
        <Box className="overflow-y-auto items-center px-4 py-2 h-full">
          <div
            className="
              grid
              grid-rows-2
              sm:grid-rows-3
              xl:grid-rows-4
              2xl:grid-rows-6
              gap-3
              mt-4
            "
          >
            <ListItem
              image="/images/tracking.png"
              name="Tracking"
              href="artist"
            />
            <ListItem
              image="/images/medicines.png"
              name="Medicines"
              href="liked"
            />
            <ListItem
              image="/images/store.png"
              name="Stores"
              href="library"
            />
            <ListItem
              image="/images/hospitals.png"
              name="Hospitals"
              href="hospitals"
            />
            <ListItem
              image="/images/news.png"
              name="News"
              href="news"
            />
          </div>
        </Box>
      </div>
      <main className="h-full w-full flex pt-2 pb-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
