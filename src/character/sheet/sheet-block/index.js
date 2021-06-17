import React from 'react'
import ReactMarkdown from 'react-markdown'

import BoxesBlock from './boxes-block'
import ListBlock from './list-block'

const BlockTypes = {
	boxes: BoxesBlock,
	list: ListBlock,
}

const headerForLevel = {
	0: '##',
	1: '###',
	2: '####',
	3: '#####',
}

const SheetBlock = ({
	hideName,
	type,
	description,
	editDescription,
	parents = [],
	...otherArgs
}) => {
	// pulled out separately so otherArgs contains all the good stuff
	const { name, value, isEditing, updateCharacter } = otherArgs
	const path = [...parents, name]

	let contents
	if ('parent' === type) {
		const { children } = otherArgs
		contents = children.map(child => (
			<SheetBlock
				{...child}
				key={`${name} ${child.name}`}
				value={value && value[child.name]}
				updateCharacter={updateCharacter}
				isEditing={isEditing}
				parents={path}
			/>
		))
	} else {
		const BlockType = BlockTypes[type]
		contents = BlockType && (
			<BlockType path={path} {...otherArgs} />
		)
	}

	return (
		<div key={name}>
			{name && !hideName && (
				<ReactMarkdown
					key="header"
					children={`${headerForLevel[parents.length]} ${name}`}
				/>
			)}
			{editDescription && isEditing && (
				<ReactMarkdown key="editDescription" children={editDescription} />
			)}
			{description && (
				<ReactMarkdown key="description" children={description} />
			)}
			{contents}
		</div>
	)

}

export default SheetBlock