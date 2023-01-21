import React, { useEffect, useRef } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import {
  ConnectedProps,
  DispatchProps,
} from "../../containers/ToastPopupContainer";
import "./ToastPopup.scss";

const TOAST_SPOTLIGHT_DURATION_MS = 1750;

type Props = ConnectedProps & DispatchProps;

export function ToastPopup({ toastShowing, toastMessage, hideToast }: Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const previousProps = usePrevious({ toastShowing, toastMessage });

  useEffect(() => {
    if (toastShowing) {
      if (!previousProps.toastShowing) {
        // Toast just got triggered (and it wasn't there before)
        timerRef.current = setTimeout(hideToast, TOAST_SPOTLIGHT_DURATION_MS);
      } else if (previousProps.toastMessage !== toastMessage) {
        // Toast was already there, but the message changed;
        // in that case, clear the old timeout and restart it
        clearTimeout(timerRef.current!);
        timerRef.current = setTimeout(hideToast, TOAST_SPOTLIGHT_DURATION_MS);
      }
    }

    return () => {
      clearTimeout(timerRef.current!);
    };
  }, [toastShowing, toastMessage]);

  return (
    <div className={`ToastPopup ${toastShowing ? "shown" : "hidden"}`}>
      {toastMessage}
    </div>
  );
}
