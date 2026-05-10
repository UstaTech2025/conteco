"use client";

import { useEffect, useState } from "react";

type Props = {
  src: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function DotLottie({ src, width = 200, height = 200, className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div style={{ width, height }} />;
  }

  return (
    <dotlottie-wc
      src={src}
      autoplay
      loop
      className={className}
      style={{ width, height, display: "block" }}
    />
  );
}
