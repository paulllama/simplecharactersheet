interface MongooseModel {
    _id: string,
}

export interface SheetBlock {
    name: string,
    blockType: "list" | "boxes" | "blocks" | "parent",
    hideName?: boolean,
    description?: string,
    editDescription?: string,
    items?: Array<string>,
    showItemAdditionalInfo?: boolean,
    count?: number,
    labels?: Array<string>,
    children?: Array<SheetBlock>,
}

export type ListSheetBlock = SheetBlock & {
    type: "list",
    items: Array<string>,
    showItemAdditionalInfo?: boolean,
}

export type BoxesSheetBlock = SheetBlock & {
    type: "boxes",
    count: number,
    labels?: Array<string>,
}

export type ParentSheetBlock = SheetBlock & {
    type: "parent",
    children: Array<SheetBlock>,
}

export type BlocksSheetBlock = SheetBlock & {
    type: "blocks",
}

export type Character = MongooseModel & {
    name?: string,
    gameId: string,
    sheetId?: string,
    userId: string,
    blocks: Array<SheetBlock>,
}

export type GameSummary = MongooseModel & {
    name: string,
    code: string,
}

export type SheetSummary = MongooseModel & {
    name: string,
    icon: string,
    description: string,
}

export type GameData = GameSummary & {
    link: string,
    stats: {
        range: {
            min: number,
            max: number,
        },
        defaultValue: number,
        names: Array<string>,
    },
    sheets: Array<SheetSummary>,
    sheetTemplate: Array<SheetBlock>,
}