import { useEffect, useState } from "react";

export function useStoredEventPlanner(): string {
  const [eventPlanner, setEventPlanner] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("eventPlanner");
    if (stored) setEventPlanner(stored);
  }, []);

  return eventPlanner;
}
