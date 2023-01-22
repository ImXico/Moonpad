import React, { useEffect, useRef } from "react";

// NOTE:
// Got this from https://medium.com/trabe/a-simple-react-theme-component-using-css-variables-e20434ae97c

export const enum Themes {
  Dark,
  Light,
}

type Props = {
  theme: Themes;
  children: React.ReactNode;
};

export function ThemeWrapper({ theme, children }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Object.entries(theme).forEach(([prop, value]) => {
      if (nodeRef.current) {
        nodeRef.current.style.setProperty(prop, value);
      }
    });
  }, [theme]);

  return <div ref={nodeRef}>{children}</div>;
}
