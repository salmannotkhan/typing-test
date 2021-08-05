import { Component } from "react";
import "../stylesheets/Result.scss";

interface Props {
	words: string[];
	typedHistory: string[];
	timeLimit: number;
	spaces: number;
	resetTest: React.MouseEventHandler;
}

export default class Result extends Component<Props> {
	render() {
		const { words, typedHistory, spaces, timeLimit } = this.props;
		let correctChars = 0;
		const result = typedHistory.map(
			(typedWord, idx) => typedWord === words[idx]
		);
		result.forEach((r, idx) => {
			if (r) correctChars += words[idx].length;
		});
		const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;
		return (
			<div className="result">
				<table>
					<tbody>
						<tr>
							<td colSpan={2} align="center">
								<h1>{Math.round(wpm) + " wpm"}</h1>
							</td>
						</tr>
						<tr>
							<th>Correct Words:</th>
							<td>{result.filter((x) => x).length}</td>
						</tr>
						<tr>
							<th>Incorrect Words:</th>
							<td>{result.filter((x) => !x).length}</td>
						</tr>
						<tr>
							<td colSpan={2} align="center">
								<button onClick={this.props.resetTest}>
									Restart
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
