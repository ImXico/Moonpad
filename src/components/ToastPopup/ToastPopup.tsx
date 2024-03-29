import React, { useEffect, useRef } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import {
  ConnectedProps,
  DispatchProps,
} from "../../containers/ToastPopupContainer";
import { StyledToastPopup } from "./styled";

const TOAST_SPOTLIGHT_DURATION_MS = 1750;

type Props = ConnectedProps & DispatchProps;

export function ToastPopup({ toastShowing, toastMessage, hideToast }: Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const previousProps = usePrevious({ toastShowing, toastMessage });

  useEffect(() => {
    if (toastShowing && previousProps) {
      if (!previousProps.toastShowing) {
        // Toast just got triggered (and it wasn't there before)
        timerRef.current = setTimeout(hideToast, TOAST_SPOTLIGHT_DURATION_MS);
      } else if (previousProps.toastMessage !== toastMessage) {
        // Toast was already there, but the message changed;
        // in that case, clear the old timeout and restart it
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(hideToast, TOAST_SPOTLIGHT_DURATION_MS);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [toastShowing, toastMessage]);

  return (
    <StyledToastPopup isShowing={toastShowing}>{toastMessage}</StyledToastPopup>
  );
}
