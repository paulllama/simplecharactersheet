import { useParams } from 'wouter'
import { useEffect, useState } from 'react'
import * as R from 'ramda'
import parse from 'html-react-parser'
import showdown from 'showdown'
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'

import { Character, getCharacter, saveCharacter, SheetBlock } from '@scc/data-store'
import { Block } from './block'

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
        return (
            <Card className='py-5'>
                <div className='text-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading Character...</span>
                    </Spinner>
                </div>
            </Card>
        )
    }

    if (!character || !character._id) {
        return (
            <Alert variant='danger'>Error loading character</Alert>
        )
    }

    return (
        <Card>
            <Row>
				<Col xs='9'>
					{isEditing ? (
						<Form.Control
							value={character.name || ''}
							onChange={newValue => updateCharacter(['name'], newValue)}
						/>
					) : character.name}
				</Col>
				<Col xs='3'>
					{isEditing ? (
						<Button
							variant='primary'
							onClick={() => {
								saveCharacter(character)
								setIsEditing(false)
							}}
						>
                            <span className='icon save' />
                        </Button>
					) : (
						<Button
							variant='primary'
							onClick={() => setIsEditing(true)}
						>
                            <span className='icon edit' />
                        </Button>
					)}
				</Col>
			</Row>
            {character.blocks.map((block: SheetBlock, blockIndex: number) => (
                <Block 
                    block={block} 
                    isEditing={true}
                    update={(value, path = []) => 
                        updateCharacter(value, ['blocks', blockIndex, ...path])
                    }
                />
            ))}
        </Card>
    )
}

export {
    CharacterSheet
}