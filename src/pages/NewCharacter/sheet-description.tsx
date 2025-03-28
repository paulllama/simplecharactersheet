import { SheetSummary } from "@scc/data-store"
import { Button } from "react-bootstrap"
import parse from 'html-react-parser'
import { useState } from "react"

export const SheetDescription = ({ sheet, createCharacterFn }: {
    sheet?: SheetSummary,
    createCharacterFn: (sheetId?: string) => Promise<void>,
}) => {
    if (sheet) {
        return (
            <div>
                <h3>{sheet.name}</h3>
                <p>{parse(sheet.description)}</p>
                <Button 
                    variant='outline-success'
                    className='btn-lg'
                    onClick={() => createCharacterFn(sheet._id)}
                >
                    Create {sheet.name}
                </Button>
            </div>
        )
    }
    return (
        <p>Choose a playbook</p>
    )
}