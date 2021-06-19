import React from 'react';
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { getGameData, createCharacter } from './data-store'
import { CharacterContainer, LoadingContainer } from './styles'
import { Button, RadioInput } from '../global-styles'
import { GiNewBorn as CreateIcon } from 'react-icons/gi'

const SheetList = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1em;
	align-items: flex-start;
`
const SheetLabel = styled.label`
	margin-bottom: 0.25em;
	cursor: pointer;
`
const CreateButton = styled(Button)`
	font-size: 1.5em;
`

const CreateCharacter = () => {
	const [gameData, setGameData] = React.useState()
	const [selectedSheet, setSelectedSheet] = React.useState()

	const history = useHistory()
	const { gameId } = useParams()
	React.useEffect(() => {
		getGameData({ gameId }).then(setGameData)
	}, [gameId])

	return gameData && gameData.sheets ? (
		<CharacterContainer>
			<h1>Create a character</h1>
			<h3>Pick a sheet to create a {gameData.name} character:</h3>
			<SheetList>
				{Object.keys(gameData.sheets).map(sheetId => (
					<SheetLabel key={sheetId}>
						<RadioInput
							name="sheet"
							value={sheetId}
							onChange={event => setSelectedSheet(event.target.value)}
						/>
						<span>{gameData.sheets[sheetId]}</span>
					</SheetLabel>
				))}
			</SheetList>
			<CreateButton
				disabled={!selectedSheet}
				icon={CreateIcon}
				label="Create"
				onClick={() => {
					const character = createCharacter({ gameId, sheetId: selectedSheet })
					history.push(`/${gameId}/${character.id}`)
				}}
			/>
		</CharacterContainer>
	) : (
		<LoadingContainer>Loading...</LoadingContainer>
	)
}

export default CreateCharacter