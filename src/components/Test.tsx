import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Test.scss";

export default function Test() {
	const { typedWord, currWord, timer, wordList, typedHistory } = useSelector(
		(state: State) => state
	);
	const extraLetters = typedWord.slice(currWord.length).split("");

	return (
		<div className="test">
			<div className="timer">{timer}</div>
			<div className="box">
				{wordList.map((word, idx) => {
					return (
						<div
							key={word + idx}
							className="word"
							id={currWord === word ? "active" : undefined}>
							{currWord === word ? (
								<span
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
