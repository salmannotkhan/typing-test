import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Result from "components/Result";
import Test from "components/Test";
import words from "helpers/words.json";
import "stylesheets/themes.scss";
import Header from "components/Header";
import Footer from "components/Footer";
import { State } from "store/reducer";
import { setTimerId, setWordList } from "store/actions";
import { recordTest } from "helpers/recordTest";

export default function App() {
	const { timerId, currWord, typedWord, timer, activeWordRef } = useSelector(
		(state: State) => state
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setWordList(words));
		window.onkeydown = (e) => {
			if (
				e.key.length === 1 ||
				e.key === "Backspace" ||
				e.key === "Tab"
			) {
				recordTest(e.key, e.ctrlKey);
				e.preventDefault();
			}
		};
		return () => {
			window.onkeydown = null;
		};
	}, [dispatch]);

	useEffect(() => {
		let idx = typedWord.length - 1;
		const currWordEl = activeWordRef?.current!;
		if (currWordEl) {
			currWordEl.children[idx + 1].classList.add(
				currWord[idx] !== typedWord[idx] ? "wrong" : "right"
			);
		}
	}, [currWord, typedWord, activeWordRef]);

	useEffect(() => {
		let idx = typedWord.length;
		const currWordEl = activeWordRef?.current!;
		if (currWordEl && idx < currWord.length)
			currWordEl.children[idx + 1].classList.remove("wrong", "right");
	}, [currWord.length, typedWord, activeWordRef]);

	useEffect(() => {
		if (timer === 0 && timerId) {
			clearInterval(timerId);
			dispatch(setTimerId(null));
		}
	}, [dispatch, timer, timerId]);

	return (
		<>
			<Header />
			{timer !== 0 ? <Test /> : <Result />}
			<Footer />
		</>
	);
}
