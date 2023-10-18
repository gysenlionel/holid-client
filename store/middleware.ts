import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setisLoadingTravelState, setDestinationState, setDatesState, setOptionsState } from "./travelSlice";
import type { AppState } from "./store";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
    matcher: isAnyOf(setisLoadingTravelState, setDestinationState, setDatesState, setOptionsState),
    effect: (action, listenerApi) => {
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(
                "holid-session",
                JSON.stringify((listenerApi.getState() as AppState))
            )
        }
    }
});
