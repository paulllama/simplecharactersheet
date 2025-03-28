import { getClerkToken } from '@scc/components/ClerkToken'
import { 
    Character,
    GameData,
    GameSummary,
} from './types'

const API_URL: string = import.meta.env.VITE_API_URL

export * from './types'

const fetchJson = async (uri: string, options?: any | void): Promise<any> => {
    const init = options ? {
        ...options,
        body: JSON.stringify(options.body),
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        }
    } : undefined

    const response = await fetch(`${API_URL}${uri}`, init)
    return response.json()
}

const authenticatedFetchJson = async (uri: string, options?: any): Promise<any> => {
    const token = await getClerkToken()

    return fetchJson(uri, {
        ...options,
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    })
}


export const getGames = async (): Promise<Array<GameSummary>> => 
    fetchJson('/games/')

export const getGameData = async (gameId: string): Promise<GameData> => 
    fetchJson(`/games/${gameId}/`)

export const getCharacter = async (characterId: string): Promise<Character> =>
    authenticatedFetchJson(`/characters/${characterId}`)

export const createCharacter = async (gameId: string, sheetId?: string) => 
    authenticatedFetchJson('/characters/', {
        method: 'PUT', 
        body: {
            gameId,
            sheetId,
        }
    })

export const saveCharacter = async (character: Character): Promise<void> => {
    authenticatedFetchJson(`/characters/${character._id}`, {
        method: 'POST', 
        body: character
    })
}