import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const scrollTo = (id: string) => {
  const element = document.querySelector(`#${id}`);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
