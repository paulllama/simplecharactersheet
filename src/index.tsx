import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import { Header } from '@scc/components/Header'
import { Routes } from '@scc/components/Routes'
import { ThemeWrapper } from '@scc/components/theme'
import { CorsClerkProvider } from '@scc/components/ClerkToken'
import './index.css'

export function App() {
	return (
		<CorsClerkProvider>
			<ThemeWrapper>
				<Header />
				<Routes />
			</ThemeWrapper>
		</CorsClerkProvider>
	);
}


createRoot(document.getElementById('app')!).render(
	<StrictMode>
	  <App />
	</StrictMode>,
  )
  