import { Component } from "react";
import "../stylesheets/Test.scss";

interface Props {
	typedWord: string;
	currWord: string;
	timer: number;
	typedHistory: string[];
	words: string[];
}

export default class Test extends Component<Props> {
	render() {
		const { typedWord, currWord, timer, words, typedHistory } = this.props;
		let extraLetters = typedWord.slice(currWord.length).split("");
		return (
			<div className="test">
				<div className="timer">{timer}</div>
				<div className="box">
					{words.map((word, idx) => {
						return (
							<div
								key={word + idx}
								className="word"
								id={currWord === word ? "active" : ""}
							>
								{currWord === word ? (
									<span
										id="caret"
										className="blink"
										style={{
											left: typedWord.length * 14.5833,
										}}
									>
										|
									</span>
								) : null}
								{word.split("").map((char, charId) => {
									return (
										<span key={char + charId}>{char}</span>
									);
								})}
								{currWord === word
									? extraLetters.map((char, charId) => {
											return (
												<span
													key={char + charId}
													className="wrong extra"
												>
													{char}
												</span>
											);
									  })
									: typedHistory[idx]
									? typedHistory[idx]
											.slice(words[idx].length)
											.split("")
											.map((char, charId) => {
												return (
													<span
														key={char + charId}
														className="wrong extra"
													>
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
}
