import { useEffect, useState } from "react";
import "stylesheets/Header.scss";

interface Options {
	time: number[];
	theme: string[];
}

const options: Options = {
	time: [15, 30, 45, 60, 120],
	theme: [
		"default",
		"mkbhd",
		"mocha",
		"coral",
		"ocean",
		"azure",
		"forest",
		"rose-milk",
	],
};

interface Props {
	setTimer: boolean;
	changeTimeLimit(x: number): void;
}

export default function Header({ setTimer, changeTimeLimit }: Props) {
	const [time, setTime] = useState<number>(0);
	const [theme, setTheme] = useState<string>("null");

	useEffect(() => {
		const theme = localStorage.getItem("theme") || "default";
		const time = parseInt(localStorage.getItem("time") || "60", 10);
		setTime(time);
		setTheme(theme);
	}, []);

	// Set Theme
	useEffect(() => {
		document
			.querySelector(`button[value="${theme}"]`)
			?.classList.add("selected");
		document.body.children[1].classList.remove(...options.theme);
		document.body.children[1].classList.add(theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	// Set Time
	useEffect(() => {
		document
			.querySelector(`button[value="${time}"]`)
			?.classList.add("selected");
		changeTimeLimit(time);
		localStorage.setItem("time", `${time}`);
	}, [time]);

	const handleOptions = ({ target }: React.MouseEvent) => {
		if (target instanceof HTMLButtonElement && target.dataset.option) {
			target.parentElement!.childNodes.forEach((el) => {
				if (el instanceof HTMLButtonElement)
					el.classList.remove("selected");
			});
			switch (target.dataset.option) {
				case "theme":
					setTheme(target.value);
					break;
				case "time":
					setTime(+target.value);
					break;
			}
			target.blur();
		}
	};

	return (
		<header className={setTimer ? "hidden" : undefined}>
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
								onClick={(e) => handleOptions(e)}>
								{choice}
							</button>
						))}
					</div>
				))}
			</div>
		</header>
	);
}
