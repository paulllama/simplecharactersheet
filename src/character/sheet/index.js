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
import { Button, getGlobalTheme, IconButton, TextInput } from '../../global-styles'
import {
	GiTinker as EditIcon,
	GiThumbUp as SaveIcon,
} from 'react-icons/gi'

const ErrorContainer = styled(CharacterContainer)`
	color: red;
`
const CharacterHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: end;
	justify-content: space-between;
	position: sticky;
	padding: 1.25em 0 0.75em;
	border-bottom: 0.15rem solid;
	background: ${getGlobalTheme().backgroundColor};
	top: 0;
	z-index: 1;
`
const CharacterName = styled.h1`
	margin-top: 0;
	margin-bottom: 0;
`
const CharacterOptions = styled.div`
	font-size: 1.25rem;
`
const SheetName = styled.h5`
	font-size: 1.25rem;
	margin-top: 0.5em;
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
				<CharacterOptions>
					{isEditing ? (
						<Button
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
				</CharacterOptions>
			</CharacterHeader>
			<SheetName>{sheet.name}</SheetName>

			<p>{sheet.description}</p>

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