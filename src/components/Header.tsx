import React from "react";

interface Options {
	time: number[];
	theme: string[];
}

const options: Options = {
	time: [15, 30, 45, 60],
	theme: ["default", "mkbhd", "coral", "ocean", "azure", "forest"],
};

interface Props {
	setTimer: NodeJS.Timeout | null;
	changeTimeLimit(x: number): void;
}

export default class Header extends React.Component<Props> {
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
		const { setTimer } = this.props;
		return (
			<header className={setTimer !== null ? "hidden" : ""}>
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
