import { useParams, useLocation } from 'wouter'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as R from 'ramda'

import { Character, getCharacter, saveCharacter } from '../../data-store'
import {
	GiTinker as EditIcon,
	GiCheckMark as SaveIcon,
} from 'react-icons/gi' 
import { getGlobalTheme, IconButton, LoadingContainer, TABLET_SIZE, TextInput } from '../../global-styles'

const CharacterContainer = styled.div`
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
	font-size: 1.25rem;
`

const CharacterSheet = () => {
    const [character, setCharacter] = useState<Character | void>()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [route, navigate] = useLocation()

    const gameId = useParams()['gameId']
    const characterId = useParams()['characterId']

    useEffect(() => {
        if (characterId) {
            setIsLoading(true)
            getCharacter(characterId).then(characterData => {
                setCharacter(characterData)
                setIsEditing(!characterData.name)
                setIsLoading(false)
            })
        }
    }, [characterId])
    
    const updateCharacter = (path: Array<string | number>, value: any) => {
        const pathLens = R.lensPath(path)
        setCharacter(R.set(pathLens, value, character))
    }
    
    if (isLoading) {
        return <LoadingContainer>Loading Character...</LoadingContainer>
    }

    if (!character || !character._id) {
        return <CharacterContainer>Error loading character</CharacterContainer>
    }

    return (
        <CharacterContainer>
            <CharacterHeader>
				<CharacterName>
					{isEditing ? (
						<TextInput
							value={character.name}
							onChange={event => updateCharacter(['name'], event.target.value)}
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
        </CharacterContainer>
    )
}

export {
    CharacterSheet
}