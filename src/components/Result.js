import React from "react";
import "../stylesheets/Result.scss";

export default class Result extends React.Component {
	render() {
		const { correctChars, correctWords, incorrectChars, incorrectWords } =
			this.props.data;
		return (
			<div className="result">
				<table>
					<tbody>
						<tr>
							<td colSpan="2" align="center">
								<h1>{Math.round(correctChars / 5) + " wpm"}</h1>
							</td>
						</tr>
						<tr>
							<th>Correct Words:</th>
							<td>
								{correctWords} ({correctChars})
							</td>
						</tr>
						<tr>
							<th>Incorrect Words:</th>
							<td>
								{incorrectWords} ({incorrectChars})
							</td>
						</tr>
						<tr>
							<td colSpan="2" align="center">
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
