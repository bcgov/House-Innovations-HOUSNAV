import React from "react";

import { IMAGES_BASE_PATH } from "@repo/constants/src/constants";

export interface ImageProps
  extends Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "id" | "className" | "alt" | "height" | "width"
  > {
  src: string;
}

export default function Image({ src, alt = "", ...props }: ImageProps) {
  const url = src.includes("/") ? src : `${IMAGES_BASE_PATH}/${src}`;
  return <img src={url} {...props} alt={alt} />;
}
