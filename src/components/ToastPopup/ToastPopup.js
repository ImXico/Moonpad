import React from 'react';
import { connect } from 'react-redux';
import { hideToastPopup } from '../../actions/toastPopup';
import './ToastPopup.scss';

const TOAST_SPOTLIGHT_DURATION_MS = 2000;

class ToastPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timeoutReference: undefined
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.toastShowing) {
      // Toast just got triggered.
      if (!prevProps.toastShowing) {
        const timeout = setTimeout(() => this.props.dispatch(hideToastPopup()), TOAST_SPOTLIGHT_DURATION_MS);
        this.setState({ timeoutReference: timeout });
      } else {
        // Toast was already there, but the message changed.
        // Clear the old timeout and restart it.
        if (this.props.toastMessage !== prevProps.toastMessage) {
          clearTimeout(this.state.timeoutReference);
          const timeout = setTimeout(() => this.props.dispatch(hideToastPopup()), TOAST_SPOTLIGHT_DURATION_MS);
          this.setState({ timeoutReference: timeout });
        }
      }
    }
  }

  render() {
    const popupShowing = this.props.toastShowing;
    return (
      <div className={`ToastPopup ${popupShowing ? 'shown' : 'hidden'}`}>
        {this.props.toastMessage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toastShowing: state.toastPopup.showing,
    toastMessage: state.toastPopup.message
  }
}

export default connect(mapStateToProps)(ToastPopup);
