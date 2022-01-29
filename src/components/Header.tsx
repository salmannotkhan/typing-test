import { resetTest } from "helpers/resetTest";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setTime } from "store/actions";
import { State } from "store/reducer";
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

export default function Header() {
	const { timerId, timeLimit, theme } = useSelector((state: State) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		const theme = localStorage.getItem("theme") || "default";
		const time = parseInt(localStorage.getItem("time") || "60", 10);
		dispatch(setTime(time));
		dispatch(setTheme(theme));
	}, [dispatch]);

	// Set Theme
	useEffect(() => {
		if (theme) {
			document
				.querySelector(`button[value="${theme}"]`)
				?.classList.add("selected");
			document.body.children[1].classList.remove(...options.theme);
			document.body.children[1].classList.add(theme);
			localStorage.setItem("theme", theme);
		}
	}, [dispatch, theme]);

	// Set Time
	useEffect(() => {
		if (timeLimit !== 0) {
			document
				.querySelector(`button[value="${timeLimit}"]`)
				?.classList.add("selected");

			dispatch(setTime(timeLimit));
			localStorage.setItem("time", `${timeLimit}`);
		}
	}, [dispatch, timeLimit]);

	const handleOptions = ({ target }: React.MouseEvent) => {
		if (target instanceof HTMLButtonElement && target.dataset.option) {
			target.parentElement!.childNodes.forEach((el) => {
				if (el instanceof HTMLButtonElement)
					el.classList.remove("selected");
			});
			switch (target.dataset.option) {
				case "theme":
					dispatch(setTheme(target.value));
					break;
				case "time":
					dispatch(setTime(+target.value));
					resetTest();
					break;
			}
			target.blur();
		}
	};

	return (
		<header className={timerId ? "hidden" : undefined}>
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
