import React from "react";
import "./App.scss";
export default class App extends React.Component {
	state = {
		currWord: "",
		typedWord: "",
		timer: 60,
		correctWords: 0,
		incorrectWords: 0,
		correctChars: 0,
		incorrectChars: 0,
	};
	timer = null;
	words = [
		"the",
		"be",
		"of",
		"and",
		"a",
		"to",
		"in",
		"he",
		"have",
		"it",
		"that",
		"for",
		"they",
		"I",
		"with",
		"as",
		"not",
		"on",
		"she",
		"at",
		"by",
		"this",
		"we",
		"you",
		"do",
		"but",
		"from",
		"or",
		"which",
		"one",
		"would",
		"all",
		"will",
		"there",
		"say",
		"who",
		"make",
		"when",
		"can",
		"more",
		"if",
		"no",
		"man",
		"out",
		"other",
		"so",
		"what",
		"time",
		"up",
		"go",
		"about",
		"than",
		"into",
		"could",
		"state",
		"only",
		"new",
		"year",
		"some",
		"take",
		"come",
		"these",
		"know",
		"see",
		"use",
		"get",
		"like",
		"then",
		"first",
		"any",
		"work",
		"now",
		"may",
		"such",
		"give",
		"over",
		"think",
		"most",
		"even",
		"find",
		"day",
		"also",
		"after",
		"way",
		"many",
		"must",
		"look",
		"before",
		"great",
		"back",
		"through",
		"long",
		"where",
		"much",
		"should",
		"well",
		"people",
		"down",
		"own",
		"just",
		"because",
		"good",
		"each",
		"those",
		"feel",
		"seem",
		"how",
		"high",
		"too",
		"place",
		"little",
		"world",
		"very",
		"still",
		"nation",
		"hand",
		"old",
		"life",
		"tell",
		"write",
		"become",
		"here",
		"show",
		"house",
		"both",
		"between",
		"need",
		"mean",
		"call",
		"develop",
		"under",
		"last",
		"right",
		"move",
		"thing",
		"general",
		"school",
		"never",
		"same",
		"another",
		"begin",
		"while",
		"number",
		"part",
		"turn",
		"real",
		"leave",
		"might",
		"want",
		"point",
		"form",
		"off",
		"child",
		"few",
		"small",
		"since",
		"against",
		"ask",
		"late",
		"home",
		"interest",
		"large",
		"person",
		"end",
		"open",
		"public",
		"follow",
		"during",
		"present",
		"without",
		"again",
		"hold",
		"govern",
		"around",
		"possible",
		"head",
		"consider",
		"word",
		"program",
		"problem",
		"however",
		"lead",
		"system",
		"set",
		"order",
		"eye",
		"plan",
		"run",
		"keep",
		"face",
		"fact",
		"group",
		"play",
		"stand",
		"increase",
		"early",
		"course",
		"change",
		"help",
		"line",
	];

	recordTest = (words, e) => {
		if (this.timer === null) {
			this.timer = setInterval(() => {
				this.setState({ timer: this.state.timer - 1 }, () => {
					if (this.state.timer === 0) {
						clearInterval(this.timer);
					}
				});
			}, 1000);
		}
		const currIdx = this.words.indexOf(this.state.currWord);
		const currWord = words[currIdx];
		if (this.state.timer > 0) {
			switch (e.key) {
				case " ":
					if (this.state.currWord === this.state.typedWord) {
						this.setState({
							correctWords: this.state.correctWords + 1,
							correctChars:
								this.state.correctChars +
								this.state.currWord.length,
						});
					} else {
						this.setState({
							incorrectWords: this.state.incorrectWords + 1,
							incorrectChars:
								this.state.incorrectChars +
								this.state.currWord.length,
						});
					}
					currWord.classList.add(this.state.typedWord === "" ? "wrong" : "right");
					this.setState({
						typedWord: "",
						currWord: this.words[currIdx + 1],
					});
					break;
				case "Backspace":	
					if (e.ctrlKey) {
						this.setState({ typedWord: "" });
						currWord.childNodes.forEach((char) => {
							char.classList.remove("wrong")
						})
					} else {
						this.setState({
							typedWord: this.state.typedWord.slice(
								0,
								this.state.typedWord.length - 1
							),
						}, () => {
							let idx = this.state.typedWord.length 
							if (idx < this.state.currWord.length) currWord.children[idx + 1].classList.remove("wrong")
						})
					}
					break;
				default:
					this.setState(
						{ typedWord: this.state.typedWord + e.key },
						() => {
							let idx = this.state.typedWord.length
							if (
								this.state.currWord[idx - 1] !==
								this.state.typedWord[idx - 1]
							) {
								currWord.children[idx].classList.add("wrong");
							}
						}
					);
					break;
			}
		}
	};

	resetTest = () => {
		this.render()
		clearInterval(this.timer);
		this.timer = null;
		this.setState({
			timer: 60,
			currWord: this.words[0],
			typedWord: "",
			correctChars: 0,
			correctWords: 0,
			incorrectWords: 0,
		});
	};

	componentDidMount() {
		const words = document.getElementsByClassName("word");
		this.setState({ currWord: this.words[0] });
		document.body.onkeyup = (e) => {
			if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 32 || e.keyCode === 8) this.recordTest(words, e);
		};
		document.body.onkeydown = (e) => {
			if (e.key === "Tab") {
				this.resetTest();
				e.preventDefault();
			}
		};
	}

	render() {
		let extraLetters = this.state.typedWord
			.slice(this.state.currWord.length)
			.split("");
		return (
			<>
				<div className="timer">{this.state.timer}</div>
				{this.state.timer !== 0 ? (
					<div className="box">
						{this.words.map((word, idx) => {
							return (
								<div
									key={word + idx}
									className="word"
									id={
										this.state.currWord === word
											? "active"
											: ""
									}
								>
									{this.state.currWord === word ? (
										<span
											className="caret"
											style={{
												left:
													this.state.typedWord
														.length * 14.5,
											}}
										>
											|
										</span>
									) : null}
									{word.split("").map((char, charId) => {
										return (
											<span key={char + charId}>
												{char}
											</span>
										);
									})}
									{this.state.currWord === word
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
				) : (
					<div className="result">
						<table>
							<tbody>
								<tr>
									<td colSpan="2" align="center">
										<h1>
											{this.state.correctChars / 5} WPM
										</h1>
									</td>
								</tr>
								<tr>
									<th>Correct Words:</th>
									<td>{this.state.correctWords} ({this.state.correctChars})</td>
								</tr>
								<tr>
									<th>Incorrect Words:</th>
									<td>{this.state.incorrectWords} ({this.state.incorrectChars})</td>
								</tr>
								<tr>
									<td colSpan="2" align="center">
										<button
											onClick={() => this.resetTest()}
										>
											Restart Test
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</>
		);
	}
}
