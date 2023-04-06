import { useEffect, useState } from "react";

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export const Timer = ({ lastTime }) => {
  const [time, setTime] = useState(Number(lastTime));

  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev - SECOND), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {Object.entries({
        Hours: time / HOUR,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60,
      }).map(([label, value]) => (
        <span key={label}>{`${Math.floor(value)}`.padStart(2, "0")}:</span>
      ))}
    </div>
  );
};
