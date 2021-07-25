import React from "react";
import "../stylesheets/Test.scss";

export default class Test extends React.Component {
	hideTimer = (e) => {
		e.target.style.opacity = e.target.style.opacity === "0" ? 1 : 0;
	};
	componentDidMount() {
		document
			.getElementsByClassName("word")[0]
			.scrollIntoView({ behavior: "smooth", block: "center" });
	}
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
					onClick={(e) => {
						this.hideTimer(e);
					}}
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
											translate:
												typedWord.length * 14.5833,
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
													className="wrong"
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
