import React from "react";
import Result from "./components/Result";
import Test from "./components/Test";
import "./App.scss";

const options = {
	time: [15, 30, 45, 60],
	theme: ["default", "mkbhd", "peachy", "beachy"],
};

export default class App extends React.Component {
	state = {
		currWord: "",
		typedWord: "",
		timer: 60,
		correctWords: 0,
		incorrectWords: 0,
		correctChars: 0,
		incorrectChars: 0,
		setTimer: null,
		timeLimit: 60,
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

	recordTest = (e) => {
		const {
			typedWord,
			currWord,
			correctChars,
			correctWords,
			incorrectChars,
			incorrectWords,
			timer,
			setTimer,
		} = this.state;
		if (timer > 0) {
			if (setTimer === null) {
				const intervalId = setInterval(() => {
					this.setState({ timer: this.state.timer - 1 }, () => {
						if (this.state.timer === 0) {
							clearInterval(this.state.setTimer);
							this.setState({ setTimer: null });
						}
					});
				}, 1000);
				this.setState({
					setTimer: intervalId,
				});
			}
			const currIdx = this.words.indexOf(currWord);
			const currWordEl = document.getElementById("active");
			currWordEl.scrollIntoView({ behavior: "smooth", block: "center" });
			const caret = document.getElementById("caret");
			caret.classList.remove("blink");
			setTimeout(() => caret.classList.add("blink"), 500);
			switch (e.key) {
				case " ":
					if (typedWord === "") {
						return;
					}
					if (currWord === typedWord) {
						this.setState({
							correctWords: correctWords + 1,
							correctChars: correctChars + currWord.length,
						});
					} else {
						this.setState({
							incorrectWords: incorrectWords + 1,
							incorrectChars: incorrectChars + currWord.length,
						});
					}
					currWordEl.classList.add(
						typedWord !== currWord ? "wrong" : "right"
					);
					this.setState({
						typedWord: "",
						currWord: this.words[currIdx + 1],
					});
					break;
				case "Backspace":
					if (e.ctrlKey) {
						this.setState({ typedWord: "" });
						currWordEl.childNodes.forEach((char) => {
							char.classList.remove("wrong", "right");
						});
					} else {
						this.setState(
							{
								typedWord: typedWord.slice(
									0,
									typedWord.length - 1
								),
							},
							() => {
								const { typedWord } = this.state;
								let idx = typedWord.length;
								if (idx < currWord.length)
									currWordEl.children[
										idx + 1
									].classList.remove("wrong", "right");
							}
						);
					}
					break;
				default:
					this.setState({ typedWord: typedWord + e.key }, () => {
						const { typedWord } = this.state;
						let idx = typedWord.length - 1;
						currWordEl.children[idx + 1].classList.add(
							currWord[idx] !== typedWord[idx] ? "wrong" : "right"
						);
					});
					break;
			}
		}
	};

	resetTest = () => {
		document
			.querySelectorAll(".wrong, .right")
			.forEach((el) => el.classList.remove("wrong", "right"));
		this.words = this.words.sort(() => Math.random() - 0.5);
		clearInterval(this.state.setTimer);
		this.setState({
			timer: this.state.timeLimit,
			currWord: this.words[0],
			typedWord: "",
			correctChars: 0,
			correctWords: 0,
			incorrectWords: 0,
			incorrectChars: 0,
			setTimer: null,
		});
	};

	componentDidMount() {
		const theme = localStorage.getItem("theme");
		const time = +localStorage.getItem("time");
		const selected = document.querySelectorAll(
			`button[value="${time}"], button[value="${theme}"]`
		);
		if (theme) {
			document.getElementById("root").classList.add(theme);
		}
		if (time) {
			this.setState({
				timer: time,
				timeLimit: time,
			});
		}
		if (selected) {
			selected.forEach((el) => el.classList.add("selected"));
		}
		this.words = this.words.sort(() => Math.random() - 0.5);
		this.setState({ currWord: this.words[0] });
		document.body.onkeydown = (e) => {
			if (e.key === "Tab") {
				if (
					this.state.timer < this.state.timeLimit ||
					this.state.setTimer
				) {
					this.resetTest();
					document.getElementsByClassName("word")[0].scrollIntoView();
				}
				e.preventDefault();
			} else if (e.key.length === 1 || e.key === "Backspace") {
				this.recordTest(e);
			}
		};
	}

	componentWillUnmount() {
		document.body.onkeydown = null;
	}

	handleOptions = (e) => {
		switch (e.target.dataset.option) {
			case "theme":
				document
					.getElementById("root")
					.classList.remove(...options.theme);
				document.getElementById("root").classList.add(e.target.value);
				break;
			case "time":
				this.setState({
					timer: e.target.value,
					timeLimit: e.target.value,
				});
				break;
			default:
				break;
		}
		localStorage.setItem(e.target.dataset.option, e.target.value);
		document
			.querySelectorAll(`.${e.target.dataset.option} button`)
			.forEach((btn) => {
				btn.classList.remove("selected");
			});
		e.target.classList.add("selected");
	};

	render() {
		const { setTimer, timer } = this.state;
		return (
			<>
				<header className={setTimer !== null ? "hidden" : ""}>
					<a href="." className="brand">
						typing-test
					</a>
					<div className="buttons">
						{Object.entries(options).map(([option, choices]) => (
							<div key={option} className={option}>
								{option}:
								{choices.map((choice) => (
									<button
										className="mini"
										key={choice}
										data-option={option}
										value={choice}
										onClick={this.handleOptions}
									>
										{choice}
									</button>
								))}
							</div>
						))}
					</div>
				</header>
				{timer !== 0 ? (
					<Test
						words={this.words}
						currWord={this.state.currWord}
						typedWord={this.state.typedWord}
						setTimer={this.state.setTimer}
						timer={this.state.timer}
					/>
				) : (
					<Result
						data={this.state}
						spaces={this.words.indexOf(this.state.currWord)}
						resetTest={() => this.resetTest()}
					/>
				)}
				<footer className={setTimer !== null ? "hidden" : ""}>
					<a href="https://www.github.com/salmannotkhan/Typing-Test">
						<span>&lt;/&gt;</span>
						github
					</a>
					<span>
						created by{" "}
						<a href="https://www.github.com/salmannotkhan">
							@salmannotkhan
						</a>
					</span>
				</footer>
			</>
		);
	}
}
