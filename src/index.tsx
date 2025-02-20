import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import { GlobalStyles, AppContainer } from './global-styles'
import { Header } from './components/Header'
import { Routes } from './components/Routes'
import { CorsClerkProvider } from './components/ClerkToken'

import './style.css' 

export function App() {
	return (
		<GlobalStyles>
			<CorsClerkProvider>
				<Header />
				<AppContainer>
					<Routes />
				</AppContainer>
			</CorsClerkProvider>
		</GlobalStyles>
	);
}


createRoot(document.getElementById('app')!).render(
	<StrictMode>
	  <App />
	</StrictMode>,
  )
  