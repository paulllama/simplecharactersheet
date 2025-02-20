import styled from 'styled-components'
import { useState, useEffect } from 'react'

import { GameSummary, getGames } from '../../data-store'
import { Card, TABLET_SIZE, Icons } from '../../global-styles'

const Home = () => {
	const [games, setGames] = useState<Array<GameSummary>>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		getGames().then(games => {
			setGames(games)
			setIsLoading(false)
		})
	}, [])

	return (
		<StyledAppHome>
			<p>Simple Character Sheets is an app for creating character sheets for indie games. Select a game below to get started:</p>
			{!isLoading && (
				<GameList>
					{games.map(game => {
						const Icon = Icons[game.icon || 'GiDiceTwentyFacesTwenty'] 
						return (
							<a href={`/games/${game._id}`}>
								<Card 
									key={game._id}
									label={game.name}
									icon={Icon}
								/>
							</a>	
						)
					})}
					<Card
						isDisabled={true}
						key="UnderConstruction"
						label="More coming soon"
						icon={Icons.GiAnvilImpact}
					/>
				</GameList>
			)}
			<p>Don't have a printer around? Everyone only has their phones? Need to add custom moves or add notes? Use Simple Character Sheet to streamline and simplify your table-top gaming.</p>
		</StyledAppHome>
	)
}

const StyledAppHome = styled.div`
	display: flex;
	flex-direction: column;
`
const GameList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: stretch;
	gap: 1em;
	margin-bottom: 2em;

	> * {
		flex-basis: calc(50% - 1em);

		@media (min-width: ${TABLET_SIZE}) {
			flex-basis: calc(33% - 1em);
		}
	}
`

export {
	Home
}
