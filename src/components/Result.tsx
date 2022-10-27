import { resetTest } from "helpers/resetTest";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Result.scss";

export default function Result() {
    const {
        word: { wordList, typedHistory, currWord },
        preferences: { timeLimit },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;
    return (
        <div className="result">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} align="center">
                            <h1>Speed: {Math.round(wpm) + " wpm"}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center">
                            <h1>Correct Words: {result.filter((x) => x).length}</h1>
                        </td>
                        
                    </tr>

                    <tr>
                        <td colSpan={2} align="center">
                            <h1>Incorrect Words: {result.filter((x) => !x).length}</h1>
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
