import React from "react";
import "../stylesheets/Footer.scss";

export default class Footer extends React.Component {
	render() {
		return (
			<div className="bottom-area">
				<span className="hint">
					<kbd>Tab</kbd> to restart test
				</span>
				<footer>
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
			</div>
		);
	}
}
