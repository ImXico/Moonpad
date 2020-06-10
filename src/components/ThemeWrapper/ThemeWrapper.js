import React from 'react';
import { Dark, Light } from './Themes';

// NOTE:
// Got this from https://medium.com/trabe/a-simple-react-theme-component-using-css-variables-e20434ae97c

class ThemeWrapper extends React.Component {

  node = React.createRef();

  componentDidMount() {
    this.updateCSSVariables();
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.updateCSSVariables();
    }
  }

  updateCSSVariables() {
    Object
      .entries(this.props.theme)
      .forEach(([prop, value]) => this.node.current.style.setProperty(prop, value));
  }

  render() {
    return (
      <div ref={this.node}>
        {this.props.children}
      </div>
    );
  }
}

export const Themes = {
  Dark,
  Light
}

export default ThemeWrapper;
