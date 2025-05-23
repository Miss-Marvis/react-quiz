import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import { QuizProvider } from './contexts/QuizContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QuizProvider>
			<App />
		</QuizProvider>
	</React.StrictMode>
)
