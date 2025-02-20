import styled from 'styled-components'
import Color from 'color'
import { useState, useEffect, JSX } from 'react'

export const LIGHT_THEME = 'Morning Sun'
export const DIM_THEME = 'Witch Moon'
export const DARK_THEME = 'Bat Night'

export type Theme = {
	linkColor: Color,
	listBullet: string,
	sublistBullet: string,
	name: string,
	backgroundColor: Color,
	containerColor: Color,
	fontColor: Color,
}

const BASE_STYLES = {
	linkColor: new Color('#ef3e27'),
	listBullet: '►',
	sublistBullet: '▻',
}
const LIGHT_THEME_STYLES: Theme = {
	...BASE_STYLES,
	name: LIGHT_THEME,
	backgroundColor: new Color('#ede7df'),
	containerColor: new Color('#f6f3ef'),
	fontColor: new Color('#2e1f22'),
}
const DARK_THEME_STYLES: Theme = {
	...BASE_STYLES,
	name: DARK_THEME,
	backgroundColor: new Color('#25191b'),
	containerColor: new Color('#332225'),
	fontColor: new Color('#f6f3ef'),
}

const STYLES_BY_THEME: {
	[name: string]: Theme
} = {
	[LIGHT_THEME]: LIGHT_THEME_STYLES,
	[DARK_THEME]: DARK_THEME_STYLES,
}

const THEME_LS_KEY = 'scs-theme'
let globalTheme: Theme

export const setGlobalTheme = (theme: Theme) => {
	if (!theme || (theme === globalTheme)) {
		return
	}
	localStorage.setItem(THEME_LS_KEY, theme.name)
	window.location.reload()
}

export const getGlobalTheme = () => {
	if (!globalTheme) {
		try {
			const shouldDefaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			const defaultTheme: string = shouldDefaultDark ? DARK_THEME : LIGHT_THEME
			const themeKeyFromStorage = localStorage.getItem(THEME_LS_KEY)
			globalTheme = STYLES_BY_THEME[themeKeyFromStorage || defaultTheme]
		} catch (e) {
			console.error(e)
		}
	}
	return globalTheme || STYLES_BY_THEME[LIGHT_THEME]
}

const ThemedStyles = styled.div`
	background: ${({ theme }) => theme.backgroundColor.string()};
	color: ${({ theme }) => theme.fontColor.string()};
	min-height: 100vh;
	font-size: 1rem;

	p {
		margin-top: 0;
		margin-bottom: 0.25em;
	}

	ul {
		margin-top: 0.75em;
		padding-left: 2.15em;
		list-style-type: '${getGlobalTheme().listBullet}';

		li {
			padding-left: 0.35em;
			margin-bottom: 0.25em;

			ul {
				list-style-type: '${getGlobalTheme().sublistBullet}';
			}
		}
	}

	blockquote {
		margin: 0;
		margin-top: 0.5em;
		margin-left: 1.15em;

		+ blockquote {
			margin-top: 0.2em;
		}
	}

	h1 {
		margin-top: 0.5rem;
		font-size: 1.5rem;
	}

	h2 {
		font-size: 1.35rem;
		margin-top: 1em;
		margin-bottom: 0.25em;
	}

	h3 {
		font-size: 1.1rem;
		margin-top: 0.75em;
		margin-bottom: 0.25em;
	}

	h4 {
		font-size: 1rem;
		margin-top: 0.5em;
		margin-bottom: 0.25em;
	}

	a {
		color: ${({ theme }) => theme.linkColor.string()};
		transition-property: color;
		transition-duration: 0.3s;
		font-weight: bold;
		text-decoration: none;

		&:hover, &:focus {
			color: ${getGlobalTheme().linkColor.mix(getGlobalTheme().fontColor).string()};
		}

		&:active {
			color: ${getGlobalTheme().fontColor.string()};
		}
	}
`

export const GlobalStyles = ({ children }: { children: JSX.Element[] | JSX.Element}) => {
	const [theme, setTheme] = useState(STYLES_BY_THEME[LIGHT_THEME])
	useEffect(() => {
		setTheme(getGlobalTheme())
	}, [])
	return (
		<ThemedStyles theme={theme}>
			{children}
		</ThemedStyles>
	)
}