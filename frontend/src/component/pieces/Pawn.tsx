import React from "react";

function Pawn({ fillcolor }: { fillcolor: string }) {
  let temp = "white";
  if(fillcolor === "#f4f7fa") temp = "black";

  return (
    <svg
    className="h-16 w-8"
      xmlns="http://www.w3.org/2000/svg"
      fill={fillcolor}
      stroke={temp}
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      image-rendering="optimizeQuality"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 265 512.88"
    >
      <path d="M218.85 394.25c12.52 21.98 33.03 44.25 29.71 73.85H16.4c-3.32-29.6 19.95-51.87 32.47-73.85h169.98zM65.53 149.31h133.94c7.64 0 13.89 6.29 13.89 13.89 0 7.6-6.29 13.9-13.89 13.9H65.53c-7.6 0-13.89-6.25-13.89-13.9 0-7.64 6.25-13.89 13.89-13.89zM132.5 0c40.53 0 73.39 32.86 73.39 73.39 0 26.17-13.7 49.14-34.32 62.13H93.43c-20.62-12.99-34.32-35.96-34.32-62.13C59.11 32.86 91.97 0 132.5 0zM73.55 190.88c-1.39 55.62-14.03 109.88-27.94 145.81h173.78c-16.19-40.76-29.57-94.31-31.44-145.81H73.55zM42.59 350.51h179.82c8.24 0 14.97 6.77 14.97 14.96 0 8.19-6.77 14.96-14.97 14.96H42.59c-8.2 0-14.97-6.73-14.97-14.96s6.73-14.96 14.97-14.96zM15.47 481.93h234.06c8.51 0 15.47 6.96 15.47 15.47 0 8.51-6.96 15.48-15.47 15.48H15.47C6.96 512.88 0 505.91 0 497.4c0-8.51 6.96-15.47 15.47-15.47z" />
    </svg>
  );
}

export default Pawn;
