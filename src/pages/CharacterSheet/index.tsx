import { useParams } from 'wouter'
import { useEffect, useState } from 'react'
import * as R from 'ramda'

import { Character, getCharacter, saveCharacter } from '@scc/data-store'
import { TextInput } from '@scc/components/input'

const CharacterSheet = () => {
    const [character, setCharacter] = useState<Character | void>()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    // const [route, navigate] = useLocation()

    const characterId = useParams()['characterId']

    useEffect(() => {
        if (characterId) {
            setIsLoading(true)
            getCharacter(characterId).then((characterData: Character) => {
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
        return <div className='loading'>Loading Character...</div>
    }

    if (!character || !character._id) {
        return <div className="character-sheet">Error loading character</div>
    }

    return (
        <div className="character-sheet">
            <h1 className='header'>
				<span>
					{isEditing ? (
						<TextInput
                            key='name'
							value={character.name || ''}
							onChange={newValue => updateCharacter(['name'], newValue)}
						/>
					) : character.name}
				</span>
				<span className='controls'>
					{isEditing ? (
						<button
							name="save"
							onClick={() => {
								saveCharacter(character)
								setIsEditing(false)
							}}
						>
                            <span className='icon save' />
                        </button>
					) : (
						<button
							name='edit'
							onClick={() => setIsEditing(true)}
						>
                            <span className='icon edit' />
                        </button>
					)}
				</span>
			</h1>
        </div>
    )
}

export {
    CharacterSheet
}