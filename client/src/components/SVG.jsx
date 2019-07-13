import React from 'react';

const svgStyle = {
  height: "0.75em",
  width: "0.75em",
  display: "block",
};

const LeftSvg = () => (
  <div>
    <svg 
      viewBox="0 0 18 18" 
      style={svgStyle}
    >
      <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" fill="pink"></path>
    </svg>
  </div>
)

// const StarSVG = () => (
//   <span>
//     <svg
//     viewBox="0 0 1000 1000"
//     >
//     <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" fill="black"></path>
//     </svg>
//   </span>
// )

export {
  LeftSvg,
  // StarSVG
};