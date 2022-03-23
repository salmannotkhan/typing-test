import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import Test from "components/Test";
import Result from "components/Result";
import Footer from "components/Footer";
import { State } from "store/reducer";
import { setTimerId } from "store/actions";
import { recordTest } from "helpers/recordTest";
import "stylesheets/themes.scss";
import CommandPallet from "components/CommandPallet";

export default function App() {
	const {
		time: { timerId, timer },
		word: { currWord, typedWord, activeWordRef },
	} = useSelector((state: State) => state);
	const dispatch = useDispatch();
	const [showPallet, setShowPallet] = useState(false);

	useEffect(() => {
		document.onkeydown = (e) => {
			if (e.ctrlKey && e.key === "k") {
				setShowPallet((s) => !s);
				e.preventDefault();
			} else if (
				e.key.length === 1 ||
				e.key === "Backspace" ||
				e.key === "Tab"
			) {
				recordTest(e.key, e.ctrlKey);
				e.preventDefault();
			}
		};
		return () => {
			document.onkeydown = null;
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
			{showPallet && <CommandPallet setShowPallet={setShowPallet} />}
			{timer !== 0 ? <Test /> : <Result />}
			<Footer />
		</>
	);
}
