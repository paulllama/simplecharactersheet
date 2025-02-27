import { useState, createContext } from 'react'

export type Theme = 'light' | 'dark'
const DEFAULT_THEME: Theme = 'dark'
const THEME_LS_KEY = 'scc-theme'
const THEME_DATA_ATTR = 'data-bs-theme'

export const ThemeContext = createContext<[Theme, (theme: Theme) => void]>([DEFAULT_THEME, () => {}])

export const ThemeWrapper = ({ children }: { 
	children: React.ReactNode 
}) => {
	const [theme, setThemeState] = useState<Theme>(() => {
		const lsTheme = localStorage.getItem(THEME_LS_KEY)
		if (!lsTheme) {
			const shouldDefaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			return shouldDefaultDark ? 'dark' : 'light'
		}
		return (lsTheme === 'dark' || lsTheme === 'light') ? lsTheme : DEFAULT_THEME
	})

	const setTheme = (theme: Theme) => {
		localStorage.setItem(THEME_LS_KEY, theme)
		document.querySelector('body')?.setAttribute(THEME_DATA_ATTR, theme)
		setThemeState(theme)
	}
	
	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			{children}
		</ThemeContext.Provider>
	)
}