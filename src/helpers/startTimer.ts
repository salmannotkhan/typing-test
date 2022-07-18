import { setTimerId, timerDecrement } from "store/actions";
import { store } from "store/store";

export const startTimer = () => {
    const { dispatch } = store;
    const timerId = setInterval(() => {
        dispatch(timerDecrement());
    }, 1000);
    dispatch(setTimerId(timerId));
};
