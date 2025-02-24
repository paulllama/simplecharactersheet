import { useState, useEffect } from 'react'

const THEME_LS_KEY = 'scc-theme'
const LIGHT_THEME = 'sunny'
const DARK_THEME = 'night'

export const ThemeWrapper = ({ children }: { 
	children: React.ReactNode 
}) => {
	const [theme, setTheme] = useState(() => {
		const shouldDefaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		return shouldDefaultDark ? DARK_THEME : LIGHT_THEME
	})
	useEffect(() => {
		const themeKeyFromStorage = localStorage.getItem(THEME_LS_KEY)
		setTheme(themeKeyFromStorage || DARK_THEME)
	}, [])
	
	return (
		<div data-theme={theme}>
			{children}
		</div>
	)
}