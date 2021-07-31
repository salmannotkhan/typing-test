import React from "react";
import "../stylesheets/Test.scss";

export default class Test extends React.Component {
	render() {
		const { typedWord, currWord, timer, words } = this.props;
		let extraLetters = typedWord.slice(currWord.length).split("");
		return (
			<div className="test">
				<div
					className={
						"timer" +
						(this.props.setTimer === null ? " hidden" : "")
					}
				>
					{timer}
				</div>
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
									: null}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
