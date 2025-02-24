import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'wouter'

import { getGameData, createCharacter, SheetSummary } from '@scc/data-store'
import { Card } from '@scc/components/card'

export const NewCharacter = () => {
	const [gameName, setGameName] = useState("")
	const [gameLink, setGameLink] = useState("")
	const [sheets, setSheets] = useState<Array<SheetSummary>>([])
	const [isLoading, setIsLoading] = useState(true)

	const [_, navigate] = useLocation()
	const gameId = useParams()['gameId']

	useEffect(() => {
		if (gameId) {
			setIsLoading(true)
			getGameData(gameId).then(gameData => {
				setSheets(gameData.sheets)
				setGameLink(gameData.link)
				setGameName(gameData.name)
				setIsLoading(false)
			})
		}
	}, [gameId])

	const createCharacterAndGoToSheet = async (sheetId?: string) => {
		if (gameId) {
			const characterId = await createCharacter(gameId, sheetId)
			const replace = !sheetId
			navigate(`/games/${gameId}/characters/${characterId}`, { replace })
		}
	}

	if (isLoading) {
		return (
			<div className='loading'>Loading...</div>
		)
	}

	if (!sheets) {
		createCharacterAndGoToSheet()
		return null
	}

	return (
		<div>
			<p>Select a {gameName} playbook:</p>
			<div className='sheet-list'>
				{sheets.map(sheet => (
					<Card
						key={sheet._id}
						onClick={() => createCharacterAndGoToSheet(sheet._id)}
						icon={sheet.icon}
						label={sheet.name}
					/>
				))}
			</div>
			<p>
				Support the game creators: <a
					target="_blank"
					rel="noreferrer"
					href={gameLink}>
						{gameName} product page
				</a>
			</p>
		</div>
	)
}
