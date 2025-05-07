import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

export default function FinishedScreen() {
	const { points, maxPossiblePoints, highscore, dispatch } = useQuiz()

	const percentage = (points / maxPossiblePoints) * 100

	let emoji
	if (percentage === 100) emoji = '🎖️'
	if (percentage >= 80 && percentage < 100) emoji = '🎉'
	if (percentage >= 50 && percentage < 80) emoji = '🙃'
	if (percentage >= 0 && percentage < 50) emoji = '😔'
	if (percentage === 0) emoji = '🤦'

	return (
		<>
			<p className='result'>
				<span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
				{maxPossiblePoints} ({Math.ceil(percentage)} %)
			</p>
			<p className='highscore'>(Highscore: {highscore} points)</p>
			<div className='next-button-container'>
				<button className='next' onClick={() => dispatch({ type: 'restart' })}>
					Restart Quiz
				</button>
			</div>
		</>
	)
}
