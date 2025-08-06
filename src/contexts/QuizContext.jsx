import { createContext, useContext, useReducer, useEffect } from 'react'

const SECS_PER_QUESTION = 30
const QuizContext = createContext()

const initialState = {
	questions: [], // Changed from Questions to questions (lowercase)
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
}

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload.questions, // Access the questions array from JSON
				status: 'ready',
			}
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			}
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			}
		case 'newAnswer': {
			const question = state.questions.at(state.index)
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			}
		}
		case 'nextQuestion':
			return { ...state, index: state.index + 1, answer: null }
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			}
		case 'restart': {
			return { ...initialState, questions: state.questions, status: 'ready' }
		}
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			}
		default:
			throw new Error('Action unknown')
	}
}

function QuizProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const {
		questions,
		status,
		index,
		answer,
		points,
		highscore,
		secondsRemaining,
	} = state

	const numQuestions = questions.length
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	)

	useEffect(function () {
		// Changed to fetch from public folder (works in production)
		fetch('/questions.json')
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'dataReceived', payload: data }))
			.catch(() => dispatch({ type: 'dataFailed' }))
	}, [])

	const value = {
		questions, // Changed from Questions to questions
		status,
		index,
		answer,
		points,
		highscore,
		secondsRemaining,
		numQuestions,
		maxPossiblePoints,
		dispatch,
	}

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

function useQuiz() {
	const context = useContext(QuizContext)
	if (context === undefined) {
		throw new Error('useQuiz must be used within a QuizProvider')
	}
	return context
}

export { QuizProvider, useQuiz }
