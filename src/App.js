import React from "react";
import "./App.scss";
export default class App extends React.Component {
	state = {
		currWord: "",
		typedWord: "",
		timer: 60,
	};
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

	componentDidMount() {
    let correctWords = 0
    let totalCorrectChar = 0
    let incorrectWords = 0
		let timer = setInterval(() => {
			this.setState({ timer: this.state.timer - 1 }, () => {
				if (this.state.timer === 0) {
          clearInterval(timer);
          alert(`Correct words: ${correctWords}, Incorrect words: ${incorrectWords}, ${totalCorrectChar/5} WPM`)
        }
			});
		}, 1000);
		const words = document.getElementsByClassName("word");
		this.setState({ currWord: this.words[0] });
		document.body.onkeyup = (e) => {
			let currIdx = this.words.indexOf(this.state.currWord);
      let currWord = words[currIdx];
			if (e.key === " ") {
        if (this.state.currWord === this.state.typedWord) {
          currWord.classList.add("right");
          correctWords++;
          totalCorrectChar += this.state.currWord.length
        }
        else {
          currWord.classList.add("wrong");
          incorrectWords++;
        }
				this.setState({ typedWord: "" });
				this.setState({
					currWord: this.words[currIdx + 1],
				});
			} else {
				if (e.key === "Backspace") {
					this.setState({
						typedWord: this.state.typedWord.slice(
							0,
							this.state.typedWord.length - 1
						),
					});
				} else {
					this.setState({ typedWord: this.state.typedWord + e.key });
				}
				if (this.state.currWord.indexOf(this.state.typedWord) !== 0) {
					words[currIdx].classList.add("wrong");
				} else {
					words[currIdx].classList.remove("wrong");
				}
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
				<div className="box">
					{this.words.map((word, idx) => {
						return (
							<div
								key={word + idx}
								className="word"
								id={
									this.state.currWord === word ? "active" : ""
								}
							>
								{/* <span class="caret">|</span> */}
								{word.split("").map((char, charId) => {
									return (
										<span key={char + charId}>{char}</span>
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
			</>
		);
	}
}
