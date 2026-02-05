import slugify from "@sindresorhus/slugify";

export const getAnchor = (value: unknown) => {
  const isString = typeof value === "string";

  return isString ? slugify(value) : "";
};
