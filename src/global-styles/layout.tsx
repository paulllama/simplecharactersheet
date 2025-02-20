import styled from 'styled-components'
import { getGlobalTheme } from './themes'
import { IconType } from 'react-icons'
import * as GameIcons from 'react-icons/gi'

export const TABLET_SIZE = '900px'
export const DESKTOP_SIZE = '1200px'

export const Icons: { [key: string]: IconType } = GameIcons

export const BaseContainer = styled.div`
	padding: 0.6rem;
	background: ${getGlobalTheme().containerColor.string()};
	border: 1px solid ${getGlobalTheme().backgroundColor.darken(0.1).string()};
`
export const AppContainer = styled(BaseContainer)`
	max-width: 50rem;
	margin-left: auto;
	margin-right: auto;

	@media (min-width: ${TABLET_SIZE}) {
		margin-top: 6vh;
		padding: 1rem 1.25rem;
	}
`
const CardLabel = styled.div`
	width: 100%;
	background: ${getGlobalTheme().containerColor.string()};
	font-weight: bold;
	padding-top: 0.3em;
	padding-bottom: 0.3em;
`
const CardContainer = styled.div`
	cursor: pointer;
	color: ${getGlobalTheme().fontColor.string()};
	background: ${getGlobalTheme().fontColor.string()};
	display: flex;
	flex-direction: column;
	align-items: center;

	svg {
		font-size: 3em;
		margin: 0.2em;
		color: ${getGlobalTheme().containerColor.string()};
	}

`
const ActiveCardContainer = styled(CardContainer)`
	&:hover {
		background: ${getGlobalTheme().linkColor.string()};
		color: ${getGlobalTheme().linkColor.string()};
	}
`
const DisabledCardContainer = styled(CardContainer)`
	color: ${getGlobalTheme().fontColor.mix(getGlobalTheme().backgroundColor).string()};
	background: ${getGlobalTheme().fontColor.mix(getGlobalTheme().backgroundColor).string()};
	cursor: default;
`

export const Card = ({ onClick, icon: Icon, label, isDisabled }: {
	onClick?: React.MouseEventHandler<HTMLDivElement>,
	icon: IconType,
	label: string,
	isDisabled?: Boolean,
}) =>
	isDisabled ? (
		<DisabledCardContainer>
			<Icon />
			<CardLabel>{label}</CardLabel>
		</DisabledCardContainer>
	) : (
		<ActiveCardContainer onClick={onClick}>
			<Icon />
			<CardLabel>{label}</CardLabel>
		</ActiveCardContainer>
	)

export const LoadingContainer = styled.div`
	@keyframes pulse {
		from { opacity: 0.5 }
		to { opacity: 1 }
	}

	animation-duration: 0.5s;
	animation-name: pulse;
	animation-iteration-count: infinite;
	animation-direction: alternate;

	text-align: center;
	padding: 20vh 0;
	font-size: 2rem;
	width: 100%;
`