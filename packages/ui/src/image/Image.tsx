import NextImage, { ImageProps } from "next/image";

import { IMAGES_BASE_PATH } from "@repo/constants/src/constants";

export default function Image({ src, ...props }: ImageProps) {
  const url = src.toString().includes("/") ? src : `${IMAGES_BASE_PATH}/${src}`;

  return <NextImage src={url} {...props} />;
}
