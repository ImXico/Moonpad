import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
import PropTypes from 'prop-types';

class ToggableIconButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shouldShowTooltip: false,
      tooltipOpeningPosition: undefined,
    }
    this.buttonRef = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.setTooltipVisibility = this.setTooltipVisibility.bind(this);
    this.calculateTooltipPosition = this.calculateTooltipPosition.bind(this);
  }

  calculateTooltipPosition() {
    const TOP_TWEAK_PX = 7;
    const ref = this.buttonRef.current;
    const boundingRect = ref.getBoundingClientRect();
    const top = boundingRect.y - boundingRect.height + TOP_TWEAK_PX;
    const right = window.innerWidth - boundingRect.x - (boundingRect.width / 2);
    return { top, right };
  }

  setTooltipVisibility(newValue) {
    this.setState({
      shouldShowTooltip: newValue,
      tooltipOpeningPosition: newValue ? this.calculateTooltipPosition() : undefined
    });
  }

  handleButtonClick() {
    this.props.onClick();
    this.setTooltipVisibility(false);
  }

  render() {
    const { shouldShowTooltip, tooltipOpeningPosition } = this.state;
    const { iconName, tooltipText, isActive } = this.props;
   
    const iconActive = require(`../../fonts/${iconName}-active.png`);
    const iconInactive = require(`../../fonts/${iconName}-inactive.png`);
    
    const style = {
      background: `url(${isActive ? iconActive : iconInactive}) no-repeat`,
      backgroundPosition: 'center',
      width: '16px',
      height: '16px',
      border: 'none',
      margin: '14px 14px 14px 0px',
      cursor: 'pointer',
      outline: 'none'
    }

    return (
      <div ref={this.buttonRef}>
        <button
          style={style}
          onClick={() => this.handleButtonClick()}
          onMouseEnter={() => this.setTooltipVisibility(true)}
          onMouseLeave={() => this.setTooltipVisibility(false)}
        >
        </button>
        {shouldShowTooltip &&
          <Tooltip
            position={tooltipOpeningPosition}
            text={tooltipText}
          />
        }
      </div>
    );
  }
}

ToggableIconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ToggableIconButton;
