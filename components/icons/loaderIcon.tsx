import { motion } from "framer-motion";

export const AdvancedLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <motion.span
          className="absolute block w-3 h-3 bg-sky-500 rounded-full"
          style={{ top: "0", left: "50%", translateX: "-50%" }}
          animate={{ y: ["-130%", "130%", "-130%"] }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        <motion.span
          className="absolute block w-3 h-3 bg-red-400 rounded-full"
          style={{ top: "50%", left: "100%", translateY: "-50%" }}
          animate={{ x: ["-130%", "-130%", "130%"] }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        <motion.span
          className="absolute block w-3 h-3 bg-gray-400 rounded-full"
          style={{ bottom: "0", left: "50%", translateX: "-50%" }}
          animate={{ y: ["130%", "-130%", "130%"] }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        <motion.span
          className="absolute block w-3 h-3 bg-blue-400 rounded-full"
          style={{ top: "50%", left: "0", translateY: "-50%" }}
          animate={{ x: ["130%", "130%", "-130%"] }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.2,
          }}
        />
      </motion.div>
    </div>
  );
};

// import { motion } from "framer-motion";

// const loaderVariants = {
//   animationOne: {
//     y: [-20, 20],
//     transition: {
//       repeat: Infinity,
//       duration: 0.5,
//     },
//   },
//   animationTwo: {
//     y: [0, -30],
//     x: [0, 30],
//     transition: {
//       repeat: Infinity,
//       duration: 0.5,
//     },
//   },
// };

// const ModernLoader = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <motion.div
//         className="w-20 h-20 mr-2 rounded-full bg-purple-600"
//         variants={loaderVariants}
//         animate="animationOne"
//       />
//       <motion.div
//         className="w-20 h-20 rounded-full bg-purple-600"
//         variants={loaderVariants}
//         animate="animationTwo"
//       />
//     </div>
//   );
// };

// export default ModernLoader;

// import React from "react";

// interface Props {
//   size: number;
//   color?: string;
// }

// const CircleLoader: React.FC<Props> = ({ size, color = "#000" }) => {
//   const radius = size / 2;
//   const strokeWidth = radius / 10;
//   const pathLength = radius * Math.PI;
//   const smallRadius = strokeWidth * 1.5;
//   const bigRadius = strokeWidth * 4;
//   const smallX =
//     radius + Math.cos(Math.PI / 4) * (radius - strokeWidth / 2 - smallRadius);
//   const smallY =
//     radius - Math.sin(Math.PI / 4) * (radius - strokeWidth / 2 - smallRadius);
//   const bigX =
//     radius + Math.cos(Math.PI / 4) * (radius - strokeWidth / 2 - bigRadius);
//   const bigY =
//     radius - Math.sin(Math.PI / 4) * (radius - strokeWidth / 2 - bigRadius);

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <circle
//         cx={radius}
//         cy={radius}
//         r={radius - strokeWidth / 2}
//         fill="none"
//         stroke={color}
//         strokeWidth={strokeWidth}
//         strokeDasharray={`${pathLength * 0.6} ${pathLength * 0.4}`}
//         strokeDashoffset={pathLength * 0.85}
//         strokeLinecap="round"
//         transform={`rotate(-90 ${radius} ${radius})`}
//       />
//       <circle cx={smallX} cy={smallY} r={smallRadius} fill={color} />
//       <circle
//         cx={bigX}
//         cy={bigY}
//         r={bigRadius}
//         fill="none"
//         stroke={color}
//         strokeWidth={strokeWidth / 2}
//         strokeDasharray={`${pathLength * 0.4} ${pathLength * 0.6}`}
//         strokeDashoffset={pathLength * 0.2}
//         strokeLinecap="round"
//         transform={`rotate(-90 ${radius} ${radius})`}
//       />
//     </svg>
//   );
// };

// export default CircleLoader;

// import React from "react";

// const InfinityLoader: React.FC = () => {
//   return (
//     <div className="flex justify-center items-center">
//       <svg
//         fill="#000000"
//         version="1.1"
//         id="Capa_1"
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         width="40px"
//         height="40px"
//         viewBox="0 0 26.349 26.35"
//         xmlSpace="preserve"
//         className="animate-spin h-5 w-5 mr-3"
//       >
//         <g>
//           <g>
//             <circle cx="13.792" cy="3.082" r="3.082" />
//             <circle cx="13.792" cy="24.501" r="1.849" />
//             <circle cx="6.219" cy="6.218" r="2.774" />
//             <circle cx="21.365" cy="21.363" r="1.541" />
//             <circle cx="3.082" cy="13.792" r="2.465" />
//             <circle cx="24.501" cy="13.791" r="1.232" />
//             <path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z" />
//             <circle cx="21.364" cy="6.218" r="0.924" />
//           </g>
//         </g>
//       </svg>
//       <p>Loading...</p>
//     </div>
//   );
// };

// export default InfinityLoader;
