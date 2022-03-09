import { resetTest } from "helpers/resetTest";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Result.scss";

export default function Result() {
	const { wordList, typedHistory, currWord, timeLimit } = useSelector(
		(state: State) => state
	);
	const spaces = wordList.indexOf(currWord);
	let correctChars = 0;
	const result = typedHistory.map(
		(typedWord, idx) => typedWord === wordList[idx]
	);
	result.forEach((r, idx) => {
		if (r) correctChars += wordList[idx].length;
	});
	var totalWords = result.filter((x) => x).length + result.filter((x) => !x).length
	var correctWords = result.filter((x) => x).length;
	var incorrectWords = result.filter((x) => !x).length;
	var accuracyUnround = correctWords/totalWords;
	var accuracyUnroundTotal = accuracyUnround * 100
	const accuracy = Math.round(accuracyUnroundTotal)
	const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;
	return (
		<div className="result">
			<table>
				<tbody>					<tr>
						<td colSpan={2} align="center">
							<h1>{Math.round(wpm) + " wpm"}</h1>
						</td>
					</tr>
					<tr>
						<td>
							<th>Total Chars:</th>
							<td>{correctChars}</td>
						</td>
					</tr>
					<tr>
						<td>
							<th>Total Words:</th>
							<td>{totalWords}</td>
						</td>
					</tr>
					<tr>
						<td>
							<th>Correct Words:</th>
							<td>{correctWords}</td>
						</td>
					</tr>
					<tr className="wrong">
						<td>
							<th>Incorrect Words:</th>
							<td>{incorrectWords}</td>
						</td>
					</tr>
					<tr className="wrong">
						<td>
							<th>Accuracy:</th>
							<td>{accuracy}%</td>
						</td>
					</tr>
					<tr>
						<td colSpan={2} align="center">
							<button onClick={() => resetTest()}>Restart</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
