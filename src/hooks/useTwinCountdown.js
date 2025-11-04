// src/hooks/useTwinCountdown.js
import { useEffect, useState } from "react";

export default function useTwinCountdown(targetMonth = 10, targetDay = 9) {
  // JS months are 0-indexed, so 10 = November
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      let target = new Date(currentYear, targetMonth, targetDay); // Nov 9
      if (now > target) {
        // If already passed, use next year
        target = new Date(currentYear + 1, targetMonth, targetDay);
      }

      const diff = target - now;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60); // hourly update
    return () => clearInterval(interval);
  }, [targetMonth, targetDay]);

  return daysLeft;
}
