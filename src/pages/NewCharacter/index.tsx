import styled from 'styled-components'

import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'wouter'

import { getGameData, createCharacter, SheetSummary } from '../../data-store'
import { Card, TABLET_SIZE } from '../../global-styles'
import * as GameIcons from 'react-icons/gi'

const SheetList = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 2em;
	margin-bottom: 4em;
	align-items: flex-start;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 1em .5em;

	> * {
		min-width: 10em;
		flex-basis: calc(33% - .5em);
	}

	@media (min-width: ${TABLET_SIZE}) {
		gap: 2em 1em;

		> * {
			flex-basis: calc(25% - 1em);
		}
	}
`

const LoadingContainer = styled.div`
`

const CharacterContainer = styled.div`
`

export const NewCharacter = () => {
	const [gameName, setGameName] = useState("")
	const [gameLink, setGameLink] = useState("")
	const [sheets, setSheets] = useState<Array<SheetSummary>>([])
	const [isLoading, setIsLoading] = useState(true)

	const [route, navigate] = useLocation()
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
			<LoadingContainer>Loading...</LoadingContainer>
		)
	}

	if (!sheets) {
		createCharacterAndGoToSheet()
		return null
	}

	return (
		<CharacterContainer>
			<p>Select a {gameName} playbook:</p>
			<SheetList>
				{sheets.map(sheet => {
					const SheetIcon = GameIcons[sheet.icon || 'IdCard']
					
					return (
						<Card
							key={sheet._id}
							onClick={() => createCharacterAndGoToSheet(sheet._id)}
							icon={SheetIcon}
							label={sheet.name}
						/>
					)
				})}
			</SheetList>
			<p>
				Support the game creators: <a
					target="_blank"
					rel="noreferrer"
					href={gameLink}>
						{gameName} product page
				</a>
			</p>
		</CharacterContainer>
	)
}
