"use client";

import type { Transition } from "motion/react";
import type { HTMLAttributes } from "react";

import { motion, useAnimation } from "motion/react";

import { cn } from "@/lib/utils";

interface CopyIconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
}

const transition: Transition = {
  damping: 17,
  mass: 1,
  stiffness: 160,
  type: "spring",
};

export const CopyIcon = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size = 28,
  ...props
}: CopyIconProps) => {
  const controls = useAnimation();

  return (
    <span
      className={cn("inline-flex", className)}
      onMouseEnter={(e) => {
        controls.start("animate");
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        controls.start("normal");
        onMouseLeave?.(e);
      }}
      {...props}
    >
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          animate={controls}
          height="14"
          rx="2"
          ry="2"
          transition={transition}
          variants={{
            animate: { translateX: -3, translateY: -3 },
            normal: { translateX: 0, translateY: 0 },
          }}
          width="14"
          x="8"
          y="8"
        />
        <motion.path
          animate={controls}
          d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
          transition={transition}
          variants={{
            animate: { x: 3, y: 3 },
            normal: { x: 0, y: 0 },
          }}
        />
      </svg>
    </span>
  );
};
