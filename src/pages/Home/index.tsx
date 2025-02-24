import { useState, useEffect } from 'react'

import { GameSummary, getGames } from '@scc/data-store'
import { Card } from '@scc/components/card'

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
		<div className='home'>
			<p>Simple Character Sheets is an app for creating character sheets for indie games. Select a game below to get started:</p>
			{!isLoading && (
				<div className='game-list'>
					{games.map(game => (
						<Card 
							key={game._id}
							label={game.name}
							href={`/games/${game._id}`}
							icon={game.icon}
						/>
					))}
					<Card
						isDisabled={true}
						key="UnderConstruction"
						label="More coming soon"
						icon=''
					/>
				</div>
			)}
			<p>Don't have a printer around? Everyone only has their phones? Need to add custom moves or add notes? Use Simple Character Sheet to streamline and simplify your table-top gaming.</p>
		</div>
	)
}

export {
	Home
}
