import { SheetBlock } from "@scc/data-store"
import { Col, Row } from "react-bootstrap"

export const Block = ({ block, isEditing, update }: {
    block: SheetBlock,
    isEditing: boolean,
    update: (value: any, path?: Array<string | number>) => void,
}) => {   
    return (
        <Row>
            {!block.hideName && (
                <Col xs='12'>
                    <h3>{block.name}</h3>
                </Col>
            )}
            <Col>{isEditing ? (block.editDescription || block.description) : block.description}</Col>
            {block.children?.length && (block.children.map((subblock, subblockIndex) => (
                <Block block={subblock}
                    isEditing={isEditing}
                    update={
                        (value, path = []) => update(value, [subblockIndex, ...path])
                    }
                />
            )))}
        </Row>
    )
}