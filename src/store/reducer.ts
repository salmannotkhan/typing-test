import { AnyAction } from "redux";
import {
	SET_CHAR,
	SET_WORD,
	TIMER_DECREMENT,
	TIMERID_SET,
	TIMER_SET,
	TIMER_RESET,
	APPEND_TYPED_HISTORY,
	PREV_WORD,
	SET_WORDLIST,
	SET_THEME,
	SET_TIME,
} from "./actions";

export interface State {
	theme: string;
	currWord: string;
	typedWord: string;
	timer: number;
	timerId: NodeJS.Timeout | null;
	timeLimit: number;
	wordList: string[];
	typedHistory: string[];
}

export const initialState: State = {
	theme: "",
	currWord: "",
	typedWord: "",
	timer: 1,
	timerId: null,
	timeLimit: 0,
	wordList: [],
	typedHistory: [],
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
	var shuffledWordList: string[];
	switch (type) {
		case TIMER_DECREMENT:
			return { ...state, timer: state.timer - 1 };
		case TIMER_SET:
			return { ...state, timer: payload };
		case TIMER_RESET:
			shuffledWordList = state.wordList.sort(() => Math.random() - 0.5);
			return {
				...state,
				timer: state.timeLimit,
				currWord: shuffledWordList[0],
				typedWord: "",
				timerId: null,
				wordList: shuffledWordList,
				typedHistory: [],
			};
		case TIMERID_SET:
			return { ...state, timerId: payload };
		case SET_CHAR:
			return { ...state, typedWord: payload };
		case SET_WORD:
			return { ...state, typedHistory: [...state.typedHistory, payload] };
		case APPEND_TYPED_HISTORY:
			const nextIdx = state.wordList.indexOf(state.currWord) + 1;
			return {
				...state,
				typedWord: "",
				currWord: state.wordList[nextIdx],
				typedHistory: [...state.typedHistory, state.typedWord],
			};
		case PREV_WORD:
			const prevIdx = state.wordList.indexOf(state.currWord) - 1;
			return {
				...state,
				currWord: state.wordList[prevIdx],
				typedWord: !payload ? state.typedHistory[prevIdx] : "",
				typedHistory: state.typedHistory.splice(
					0,
					state.typedHistory.length - 1
				),
			};
		case SET_WORDLIST:
			shuffledWordList = payload.sort(() => Math.random() - 0.5);
			return {
				...state,
				currWord: shuffledWordList[0],
				wordList: shuffledWordList,
			};
		case SET_THEME:
			return { ...state, theme: payload };
		case SET_TIME:
			return {
				...state,
				timer: payload,
				timeLimit: payload,
			};
		default:
			return state;
	}
};
