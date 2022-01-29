import { resetTimer } from "store/actions";
import { store } from "store/store";

export const resetTest = () => {
	const { dispatch, getState } = store;
	const { timerId } = getState();
	document
		.querySelectorAll(".wrong, .right")
		.forEach((el) => el.classList.remove("wrong", "right"));
	if (timerId) {
		clearInterval(timerId);
	}
	dispatch(resetTimer());
};
