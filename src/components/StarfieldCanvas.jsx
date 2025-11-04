import React, { useEffect, useRef } from "react";
import { createStarfield } from "../lib/starfield";

export default function StarfieldCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // createStarfield now returns a cleanup function
    const cleanup = createStarfield(canvasRef.current);
    return () => {
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20" />;
}
