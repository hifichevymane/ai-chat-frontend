import { useState, useEffect } from "react";

interface Props {
  isLoading: boolean;
  minDuration?: number;
}

export default function LoadingPlaceholder({ isLoading, minDuration = 1200 }: Props) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let fadeTimer: NodeJS.Timeout;

    if (!isLoading) {
      fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, minDuration);
    }

    return () => clearTimeout(fadeTimer);
  }, [isLoading, minDuration]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-400 ${isFadingOut ? "opacity-0 pointer-events-none z-0" : "opacity-100 pointer-events-auto z-50"}`}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-6"></div>
        <span className="text-lg text-primary-600 font-semibold tracking-wide">Loading...</span>
      </div>
    </div>
  );
}
