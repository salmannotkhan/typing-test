import { Component } from "react";
import "../stylesheets/Header.scss";

interface Options {
	time: number[];
	theme: string[];
}

const options: Options = {
	time: [15, 30, 45, 60],
	theme: ["default", "mkbhd", "coffee", "coral", "ocean", "azure", "forest", "rose-milk"],
};

interface Props {
	changeTimeLimit(x: number): void;
}

export default class Header extends Component<Props> {
	componentDidMount() {
		const theme = localStorage.getItem("theme") || "default";
		const time = parseInt(localStorage.getItem("time") || "60", 10);
		document.body.children[1].classList.add(theme);
		const selectedElements = document.querySelectorAll(
			`button[value="${theme}"], button[value="${time}"]`
		);
		selectedElements.forEach((el) => {
			el.classList.add("selected");
		});
	}

	handleOptions = ({ target }: React.MouseEvent) => {
		if (target instanceof HTMLButtonElement && target.dataset.option) {
			switch (target.dataset.option) {
				case "theme":
					document.body.children[1].classList.remove(
						...options.theme
					);
					document.body.children[1].classList.add(target.value);
					break;
				case "time":
					this.props.changeTimeLimit(+target.value);
					break;
			}
			localStorage.setItem(target.dataset.option, target.value);
			target.parentElement!.childNodes.forEach((el) => {
				if (el instanceof HTMLButtonElement)
					el.classList.remove("selected");
			});
			target.classList.add("selected");
			target.blur();
		}
	};

	render() {
		return (
			<header>
				<a href="." className="brand">
					typing-test
				</a>
				<div className="buttons">
					{Object.entries(options).map(([option, choices]) => (
						<div key={option} className={option}>
							{option}:
							{choices.map((choice: string) => (
								<button
									className="mini"
									key={choice}
									data-option={option}
									value={choice}
									onClick={(e) => this.handleOptions(e)}
								>
									{choice}
								</button>
							))}
						</div>
					))}
				</div>
			</header>
		);
	}
}
