import React from "react";

export default class Result extends React.Component {
	render() {
		return (
			<div className="result">
				<table>
					<tbody>
						<tr>
							<td colSpan="2" align="center">
								<h1>
									{Math.round(
										this.props.data.correctChars / 5
									) + " wpm"}
								</h1>
							</td>
						</tr>
						<tr>
							<th>Correct Words:</th>
							<td>
								{this.props.data.correctWords} (
								{this.props.data.correctChars})
							</td>
						</tr>
						<tr>
							<th>Incorrect Words:</th>
							<td>
								{this.props.data.incorrectWords} (
								{this.props.data.incorrectChars})
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
