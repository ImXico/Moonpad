import React, { useEffect, useRef } from "react";
import { Light as LightTheme, Dark as DarkTheme } from "./Themes";

// NOTE:
// Got this from https://medium.com/trabe/a-simple-react-theme-component-using-css-variables-e20434ae97c

export const enum Themes {
  Dark = "Dark",
  Light = "Light",
}

type Props = {
  theme: Themes;
  children: React.ReactNode;
};

export function ThemeWrapper({ theme, children }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const themeObject: { [colorKey: string]: string } =
    theme === Themes.Dark ? DarkTheme : LightTheme;

  useEffect(() => {
    Object.entries(themeObject).forEach(([prop, value]) => {
      if (nodeRef.current) {
        nodeRef.current.style.setProperty(prop, value);
      }
    });
  }, [theme]);

  return <div ref={nodeRef}>{children}</div>;
}
