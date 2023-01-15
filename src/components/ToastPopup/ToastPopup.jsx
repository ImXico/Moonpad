import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { hideToastPopup } from "../../actions/toastPopup";
import { usePrevious } from "../../hooks/usePrevious";
import "./ToastPopup.scss";

const TOAST_SPOTLIGHT_DURATION_MS = 1750;

function ToastPopup({ toastShowing, toastMessage, hideToast }) {
  const [timeoutReference, setTimeoutReference] = useState(undefined);
  const previousProps = usePrevious({ toastShowing, toastMessage });

  useEffect(() => {
    if (!toastShowing) {
      return;
    }

    if (!previousProps.toastShowing) {
      // Toast just got triggered (and it wasn't there before)
      setTimeoutReference(setTimeout(hideToast, TOAST_SPOTLIGHT_DURATION_MS));
    } else if (previousProps.toastMessage !== toastMessage) {
      // Toast was already there, but the message changed; in that case,
      // clear the old timeout and restart it
      clearTimeout(timeoutReference);
      setTimeoutReference(setTimeout(hideToast, TOAST_SPOTLIGHT_DURATION_MS));
    }
  }, [toastShowing, toastMessage]);

  return (
    <div className={`ToastPopup ${toastShowing ? "shown" : "hidden"}`}>
      {toastMessage}
    </div>
  );
}

const mapStateToProps = (state) => ({
  toastShowing: state.toastPopup.showing,
  toastMessage: state.toastPopup.message,
});

const mapDispatchToProps = (dispatch) => ({
  hideToast: () => dispatch(hideToastPopup()),
});

ToastPopup.propTypes = {
  toastShowing: PropTypes.bool.isRequired,
  toastMessage: PropTypes.string.isRequired,
  hideToast: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastPopup);
