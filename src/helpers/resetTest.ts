import { resetTimer, setWordList } from "store/actions";
import { store } from "store/store";

export const resetTest = async () => {
	const { dispatch, getState } = store;
	const { timerId } = getState();
	document
		.querySelectorAll(".wrong, .right")
		.forEach((el) => el.classList.remove("wrong", "right"));
	if (timerId) {
		clearInterval(timerId);
	}
	import(`helpers/words.json`).then((words) =>
		dispatch(setWordList(words.default))
	);
	dispatch(resetTimer());
};
