import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    var root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const matchMediaDark = window.matchMedia("(prefers-color-scheme: dark)");
    const matchMediaLight = window.matchMedia("(prefers-color-scheme: light)");

    if (matchMediaDark.matches) setDarkMode(true);
    else if (matchMediaLight.matches) setDarkMode(false);
    else setDarkMode(false);

    const darkListener = (e: MediaQueryListEvent) =>
      e.matches && setDarkMode(true);
    matchMediaDark.addEventListener("change", darkListener);

    const lightListener = (e: MediaQueryListEvent) =>
      e.matches && setDarkMode(false);
    matchMediaLight.addEventListener("change", lightListener);

    return () => {
      matchMediaDark.removeEventListener("change", darkListener);
      matchMediaLight.removeEventListener("change", lightListener);
    };
  }, []);

  return (
    <div className="absolute top-0 right-0 p-2">
      <button
        className="border-0 ring-0 bg-transparent dark:bg-transparent rounded-full w-12 h-12 p-2"
        title={`Change to ${darkMode ? "light" : "dark"} mode`}
        onClick={handleToggleDarkMode}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default DarkModeSwitch;
