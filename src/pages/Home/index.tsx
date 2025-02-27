import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { GameSummary, getGames } from '@scc/data-store'

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
				<div className='row g-4'>
					{games.map(game => (
						<div className='col-6 col-md-4'>
							<Card 
								key={game._id}
								as='a'
								href={`/games/${game._id}`}
								className='overflow-hidden'
							>
								<Card.Img variant="top" src={`game-assets/${game.code}/thumbnail.jpg`} />
								<Card.ImgOverlay className='bg-body'>
									<Card.Title className='fw-bold'>{game.name}</Card.Title>
									<Card.Text>Create a character {'>'}</Card.Text>
								</Card.ImgOverlay>
							</Card>
						</div>
					))}
					<p>More coming soon!</p>
				</div>
			)}
			<p>Don't have a printer around? Everyone only has their phones? Need to add custom moves or add notes? Use Simple Character Sheet to streamline and simplify your table-top gaming.</p>
		</div>
	)
}

export {
	Home
}
