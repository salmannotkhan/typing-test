import { Component } from "react";
import Result from "./components/Result";
import Test from "./components/Test";
import { words } from "./helpers/words.json";
import "./stylesheets/themes.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface State {
	currWord: string;
	typedWord: string;
	timer: number;
	setTimer: NodeJS.Timeout | null;
	timeLimit: number;
	typedHistory: string[];
}

export default class App extends Component<{}, State> {
	words = words.sort(() => Math.random() - 0.5);
	state: State = {
		currWord: this.words[0],
		typedWord: "",
		timer: 60,
		setTimer: null,
		timeLimit: 60,
		typedHistory: [],
	};

	startTimer = () => {
		const intervalId = setInterval(() => {
			this.setState({ timer: this.state.timer - 1 }, () => {
				if (this.state.timer === 0 && this.state.setTimer) {
					clearInterval(this.state.setTimer);
					this.setState({ setTimer: null });
				}
			});
		}, 1000);
		this.setState({
			setTimer: intervalId,
		});
	};

	recordTest = (e: KeyboardEvent) => {
		const {
			typedWord,
			currWord,
			timer,
			timeLimit,
			setTimer,
			typedHistory,
		} = this.state;
		if (timer === 0) {
			if (e.key === "Tab") {
				this.resetTest();
				e.preventDefault();
			}
			return;
		}
		if (setTimer === null && e.key !== "Tab") this.startTimer();
		const currIdx = this.words.indexOf(currWord);
		const currWordEl = document.getElementById("active")!;
		currWordEl.scrollIntoView({ behavior: "smooth", block: "center" });
		const caret = document.getElementById("caret")!;
		caret.classList.remove("blink");
		setTimeout(() => caret?.classList.add("blink"), 500);
		switch (e.key) {
			case "Tab":
				if (timer !== timeLimit || setTimer) {
					this.resetTest();
					document.getElementsByClassName("word")[0].scrollIntoView();
				}
				e.preventDefault();
				break;
			case " ":
				if (typedWord === "") return;
				currWordEl.classList.add(
					typedWord !== currWord ? "wrong" : "right"
				);
				this.setState({
					typedWord: "",
					currWord: this.words[currIdx + 1],
					typedHistory: [...typedHistory, typedWord],
				});
				break;
			case "Backspace":
				if (
					typedWord.length === 0 &&
					typedHistory[currIdx - 1] !== this.words[currIdx - 1]
				) {
					this.setState({
						currWord: this.words[currIdx - 1],
						typedWord: !e.ctrlKey ? typedHistory[currIdx - 1] : "",
						typedHistory: typedHistory.splice(
							0,
							typedHistory.length - 1
						),
					});
					currWordEl.previousElementSibling!.classList.remove(
						"right",
						"wrong"
					);
					if (e.ctrlKey) {
						currWordEl.previousElementSibling!.childNodes.forEach(
							(char) => {
								if (char instanceof HTMLSpanElement)
									char.classList.remove("wrong", "right");
							}
						);
					}
				} else {
					if (e.ctrlKey) {
						this.setState({ typedWord: "" });
						currWordEl.childNodes.forEach((char) => {
							if (char instanceof HTMLSpanElement)
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
								let idx = this.state.typedWord.length;
								if (idx < currWord.length)
									currWordEl.children[
										idx + 1
									].classList.remove("wrong", "right");
							}
						);
					}
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
	};

	resetTest = () => {
		document
			.querySelectorAll(".wrong, .right")
			.forEach((el) => el.classList.remove("wrong", "right"));
		this.words = this.words.sort(() => Math.random() - 0.5);
		if (this.state.setTimer) {
			clearInterval(this.state.setTimer);
		}
		this.setState({
			timer: this.state.timeLimit,
			currWord: this.words[0],
			typedWord: "",
			setTimer: null,
			typedHistory: [],
		});
	};

	componentDidMount() {
		const time = parseInt(localStorage.getItem("time") || "60", 10);
		this.setState({
			timer: time,
			timeLimit: time,
		});
		window.onkeydown = (e) => {
			if (
				e.key.length === 1 ||
				e.key === "Backspace" ||
				e.key === "Tab"
			) {
				this.recordTest(e);
			}
		};
	}

	componentWillUnmount() {
		window.onkeydown = null;
	}

	changeTimeLimit(newLimit: number) {
		this.setState(
			{
				timeLimit: newLimit,
			},
			() => this.resetTest()
		);
	}

	render() {
		const { setTimer, timer } = this.state;
		return (
			<>
				{!setTimer ? (
					<Header
						changeTimeLimit={(newLimit: number) =>
							this.changeTimeLimit(newLimit)
						}
					/>
				) : null}
				{timer !== 0 ? (
					<Test
						words={this.words}
						currWord={this.state.currWord}
						typedWord={this.state.typedWord}
						typedHistory={this.state.typedHistory}
						timer={this.state.timer}
					/>
				) : (
					<Result
						words={this.words}
						typedHistory={this.state.typedHistory}
						timeLimit={this.state.timeLimit}
						spaces={this.words.indexOf(this.state.currWord)}
						resetTest={() => this.resetTest()}
					/>
				)}
				{!setTimer ? <Footer /> : null}
			</>
		);
	}
}
