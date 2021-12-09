import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import SheetBlock from './block'
import Stats from './stats'
import {
	getCharacterAndGameData,
	saveCharacter,
} from '../data-store'
import { LoadingContainer, CharacterContainer } from '../styles'
import { useParams } from 'react-router-dom'
import {
	Button,
	IconButton,
	TextInput,
	getGlobalTheme,
	TABLET_SIZE,
} from '../../global-styles'
import {
	GiTinker as EditIcon,
	GiCheckMark as SaveIcon,
} from 'react-icons/gi'

const ErrorContainer = styled(CharacterContainer)`
	color: red;
`
const CharacterHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-between;
	position: sticky;
	padding-bottom: 0.75em;
	border-bottom: 0.15rem solid;
	background: ${getGlobalTheme().containerColor};
	top: 0;
	z-index: 1;
	align-items: end;
	font-size: 0.75rem;

	@media (min-width: ${TABLET_SIZE}) {
		font-size: 1rem;
		height: 3rem;
	}
`
const CharacterName = styled.h1`
	margin-top: 0;
	margin-bottom: 0;
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
`
const SheetControls = styled.div`

`
const SheetName = styled.div`
	margin-top: 0.5em;
`
const SheetDescription = styled.div`
	margin-top: 1.5em;
	margin-bottom: 1.5em;
	font-style: italic;
`

const CharacterSheet = () => {
	let { gameId, characterId } = useParams()

	const [isEditing, setIsEditing] = React.useState(false)
	const [error, setError] = React.useState()
	const [character, setCharacter] = React.useState()
	const [game, setGame] = React.useState()
	const [sheet, setSheet] = React.useState()

	React.useEffect(
		() => {
			getCharacterAndGameData({ characterId, gameId }).then(
				({ error, ...data }) => {
					if (error) {
						setError(error)
						return
					}
					setIsEditing(!data.character.name)
					setCharacter({
						name: `Name your ${data.sheet.name}`,
						...data.character
					})
					setGame(data.game)
					setSheet(data.sheet)
					setError(undefined)
				})
		},
		[characterId, gameId]
	)

	React.useEffect(() => {
		if (character && !isEditing) {
			saveCharacter(character)
		}
	}, [character, isEditing])

	const updateCharacter = ({ path, value }) => {
		const pathLens = R.lensPath(path)
		const updatedCharacter = R.set(pathLens, value, character)
		setCharacter(updatedCharacter)
	}

	if (error) {
		return (
			<ErrorContainer>{error}</ErrorContainer>
		)
	}

	if (!game || !sheet) {
		return (
			<LoadingContainer>Loading...</LoadingContainer>
		)
	}

	if (!character) {
		return (
			<ErrorContainer>Error loading character</ErrorContainer>
		)
	}

	return (
		<CharacterContainer>
			<CharacterHeader>
				<CharacterName>
					{isEditing ? (
						<TextInput
							value={character.name}
							onChange={event => updateCharacter({ path: ['name'], value: event.target.value })}
						/>
					) : character.name}
				</CharacterName>
				<SheetControls>
					{isEditing ? (
						<IconButton
							icon={SaveIcon}
							label="Save"
							onClick={() => {
								saveCharacter(character)
								setIsEditing(false)
							}}
						/>
					) : (
						<IconButton
							icon={EditIcon}
							label="Edit Character"
							onClick={() => setIsEditing(true)}
						/>
					)}
				</SheetControls>
			</CharacterHeader>
			<SheetName>
				<h4>{sheet.name}</h4>
			</SheetName>

			<SheetDescription>
				<p>{sheet.description}</p>
			</SheetDescription>

			<Stats {...game.stats} isEditing={isEditing} />

			{sheet.blocks.map((block, index) => (
				<SheetBlock
					{...block}
					key={`block-${index}`}
					value={character[block.name]}
					isEditing={isEditing}
					updateCharacter={updateCharacter}
				/>
			))}
		</CharacterContainer>
	)
}

export default CharacterSheet