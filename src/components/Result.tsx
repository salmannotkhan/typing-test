import { resetTest } from "helpers/resetTest";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import type from "../images/typing.png";
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
        <div className="result" style={{ 
            backgroundImage:  `url(${type})`,
            width:'360px' ,
            height:'320px',
            borderRadius:'10px'
          }}>
            
            <table>
                <tbody>
                    <tr>
                
                           
                           <td>{Math.round(wpm) + " WPM"}</td>
                    </tr>
                    <tr>
                        <th>Correct Words:</th>
                        <td>{result.filter((x) => x).length}</td>
                    </tr>
                    <tr className="wrong">
                        <th>Incorrect Words:</th>
                        <td>{result.filter((x) => !x).length}</td>
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
