import { useQuiz } from '../contexts/QuizContext'

export default function NextButton() {
	const { dispatch, answer, index, numQuestions } = useQuiz()

	if (answer === null) return null

	return (
		<div className='next-button-container'>
			<button
				className='next'
				onClick={() =>
					dispatch({
						type: index < numQuestions - 1 ? 'nextQuestion' : 'finish',
					})
				}
			>
				{index < numQuestions - 1 ? 'Next' : 'Finished'}
			</button>
		</div>
	)
}
