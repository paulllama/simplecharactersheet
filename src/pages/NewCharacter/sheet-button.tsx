import { GameIcon } from '@scc/components/game-icon'
import { SheetSummary } from '@scc/data-store'
import { Button, Col, Row } from 'react-bootstrap'

export const SheetButton = ({ isActive, showDescription, sheet }: {
    isActive?: boolean,
    showDescription: (sheet:SheetSummary) => void,
    sheet: SheetSummary
}) => (
        <Button
            variant={isActive ? 'primary' : 'secondary'}
            className='container text-start'
            onClick={() => showDescription(sheet)}
        >
            <Row>
                <Col xs='2'>
                    <GameIcon className='justify-content-end' icon={sheet.icon} />
                </Col>
                <Col xs='9'>
                    <h4>{sheet.name}</h4>
                </Col>
            </Row>
        </Button>
)
