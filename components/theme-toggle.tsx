"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tushe-theme";

export function ThemeToggle() {
  // null until mounted: avoids briefly showing the wrong label before we
  // know what the inline init script (in layout.tsx) already set on <html>
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "Light");
  }, []);

  function toggle() {
    const next = theme === "Dark" ? "Light" : "Dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // localStorage can throw in private/incognito modes in some browsers;
      // the toggle still works for this session, it just won't persist
    }
    setTheme(next);
  }

  if (theme === null) return null;

  return (
    <button onClick={toggle} className=" absolute top-10 right-10 text-surface-flat px-4 py-2 size-10 flex items-center justify-center bg-surface-bold rounded-lg">
      {theme === "Dark" ? <MoonIcon className="shrink-0" /> : <SunIcon  className="shrink-0"/>}
    </button>
  );
}