"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string = "(max-width: 768px)") {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleMatchChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", handleMatchChange);

    return () => mediaQueryList.removeEventListener("change", handleMatchChange);
  }, [query]);

  return matches;
}
