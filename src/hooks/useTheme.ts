import useLocalStorage from "use-local-storage";

enum ThemeKeys {
  DARK = "dark",
  LIGHT = "light",
}

export const useTheme = () => {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? ThemeKeys.DARK : ThemeKeys.LIGHT
  );
  const isLight = theme === ThemeKeys.LIGHT;
  const switchTheme = () => {
    setTheme(isLight ? ThemeKeys.DARK : ThemeKeys.LIGHT);
  };

  return { theme, isLight, switchTheme };
};
