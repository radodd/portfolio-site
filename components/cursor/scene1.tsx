"use client";

import { useState } from "react";
import Cursor from "./cursor";

const Scene1 = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center">
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-[4.5vw] max-w-[90vw] text-center text-white p-20"
      >
        FREELANCE DEVELOPER
      </h1>
      <Cursor isHovered={isHovered} />
    </div>
  );
};

export default Scene1;
