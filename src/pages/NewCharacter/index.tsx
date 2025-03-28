import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'wouter'
import { Col, Row } from 'react-bootstrap'
import { getGameData, createCharacter, SheetSummary } from '@scc/data-store'
import { SheetButton } from './sheet-button'
import { SheetDescription } from './sheet-description'

export const NewCharacter = () => {
	const [gameName, setGameName] = useState("")
	const [gameLink, setGameLink] = useState("")
	const [sheets, setSheets] = useState<Array<SheetSummary>>([])
	const [activeSheet, setActiveSheet] = useState<SheetSummary>()
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
		<>
			<h1 className='text-center'>New Character</h1>
			<Row className='justify-content-center my-4'>
				<Col sm='6' lg='7' className='justify-content-center'>
					<Row className='g-2 g-lg-4'>
						{sheets.map(sheet => (
							<Col lg='6' xs='12' key={sheet._id}>
								<SheetButton 
									isActive={activeSheet && sheet._id === activeSheet._id}
									showDescription={setActiveSheet}
									sheet={sheet}
								/>
							</Col>
						))}
					</Row>
				</Col>
				<Col sm='6' lg='3'>
					<SheetDescription 
						sheet={activeSheet} 
						createCharacterFn={createCharacterAndGoToSheet}
					/>
				</Col>
			</Row>
			<p className='text-center'>
				Support the game creators: <a
					target="_blank"
					rel="noreferrer"
					href={gameLink}>
						{gameName} product page
				</a>
			</p>
		</>
	)
}
