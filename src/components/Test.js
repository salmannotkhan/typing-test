import React from "react";
import "../stylesheets/Test.scss"

export default class Test extends React.Component {
	hideTimer = (e) => {
		e.target.style.opacity = e.target.style.opacity === "0" ? 1 : 0
	}
	componentDidMount() {
		document.getElementsByClassName("word")[0].scrollIntoView()
	}
	render() {
		let extraLetters = this.props.typedWord
			.slice(this.props.currWord.length)
			.split("");
		return (
			<div className="test">
				<div className="timer" onClick={(e) => {this.hideTimer(e)}}>{this.props.timer}</div>
				<div className="box">
					{this.props.words.map((word, idx) => {
						return (
							<div
								key={word + idx}
								className="word"
							>
								{this.props.currWord === word ? (
									<span
										id="caret"
										className="blink"
										style={{
											translate:
												this.props.typedWord.length *
												14.5833,
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
								{this.props.currWord === word
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
