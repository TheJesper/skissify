"use client";

import { useRef, useEffect } from "react";
import { SketchData } from "@/lib/types";
import { renderSketch } from "@/lib/renderer";

interface Props {
  data: SketchData;
}

export default function PublicSketchView({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const w = data.width || 900;
  const h = data.height || 650;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    renderSketch(ctx, data, w, h);
  }, [data, w, h]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={w}
        height={h}
        className="rounded-lg shadow-2xl"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
