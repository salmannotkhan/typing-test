import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRef, setCaretRef } from "store/actions";
import { State } from "store/reducer";
import "stylesheets/Test.scss";

export default function Test() {
	const { typedWord, currWord, timer, wordList, typedHistory } = useSelector(
		(state: State) => state
	);
	const dispatch = useDispatch();
	const extraLetters = typedWord.slice(currWord.length).split("");
	const activeWord = useRef<HTMLDivElement>(null);
	const caretRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		dispatch(setRef(activeWord));
		dispatch(setCaretRef(caretRef));
	}, [dispatch]);

	return (
		<div className="test">
			<div className="timer">{timer}</div>
			<div className="box">
				{wordList.map((word, idx) => {
					return (
						<div
							key={word + idx}
							className="word"
							ref={currWord === word ? activeWord : null}>
							{currWord === word ? (
								<span
									ref={caretRef}
									id="caret"
									className="blink"
									style={{
										left: typedWord.length * 14.5833,
									}}>
									|
								</span>
							) : null}
							{word.split("").map((char, charId) => {
								return <span key={char + charId}>{char}</span>;
							})}
							{currWord === word
								? extraLetters.map((char, charId) => {
										return (
											<span
												key={char + charId}
												className="wrong extra">
												{char}
											</span>
										);
								  })
								: typedHistory[idx]
								? typedHistory[idx]
										.slice(wordList[idx].length)
										.split("")
										.map((char, charId) => {
											return (
												<span
													key={char + charId}
													className="wrong extra">
													{char}
												</span>
											);
										})
								: null}
						</div>
					);
				})}
			</div>
		</div>
	);
}
