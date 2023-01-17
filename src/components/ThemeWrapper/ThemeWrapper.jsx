import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Dark, Light } from "./Themes";

// NOTE:
// Got this from https://medium.com/trabe/a-simple-react-theme-component-using-css-variables-e20434ae97c

function ThemeWrapper({ theme, children }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    Object.entries(theme).forEach(([prop, value]) => {
      nodeRef.current.style.setProperty(prop, value);
    });
  }, [theme]);

  return <div ref={nodeRef}>{children}</div>;
}

ThemeWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export const Themes = {
  Dark,
  Light,
};

export default ThemeWrapper;
