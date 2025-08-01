import { useEffect, useState } from "react";

export function useStoredUser(): string {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(stored);
  }, []);

  return user;
}
