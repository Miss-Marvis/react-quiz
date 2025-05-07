import { useQuiz } from '../contexts/QuizContext'
import Header from './Header'
import Start from './Start'
import './App.css'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishedScreen from './FinishedScreen'
import Timer from './Timer'
import Footer from './Footer'

export default function App() {
	const { status } = useQuiz()

	return (
		<div className='app'>
			<Header />
			<Start>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen />}
				{status === 'active' && (
					<>
						<Progress />
						<Question />
						<Footer>
							<Timer />
							<NextButton />
						</Footer>
					</>
				)}
				{status === 'finished' && <FinishedScreen />}
			</Start>
		</div>
	)
}
