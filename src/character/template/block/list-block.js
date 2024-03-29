import React from 'react'
import * as R from 'ramda'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { CheckboxInput, TextInput } from '../../../global-styles'

const StyledListItem = styled.div`
	display: flex;
	align-items: flex-start;
	margin-top: 0.25em;
	margin-bottom: 0.25em;
`
const ListItemText = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 100%;
	cursor: pointer;
`
const ListItemValue = styled.div`
	p {
		margin-block-start: 0;
    margin-block-end: 0;
	}
`
const Spacer = styled.div`
	margin-bottom: 0.5em;
`

const ListItem = ({
	name,
	index,
	isChecked,
	isEditing,
	setItemValue,
	showTextInput,
	value,
	showAdditionalInfo,
	additionalInfoValue,
}) => {
	const key = `${name} ${index}`

	return (isEditing || isChecked) ? (
		<StyledListItem key={key}>
			{isEditing && (
				<CheckboxInput
					id={key}
					name={key}
					checked={isChecked}
					onChange={() => setItemValue({ index, newValue: !isChecked })}
				/>
			)}
			<ListItemText>
				<ListItemValue onClick={() => setItemValue({ index, newValue: !isChecked })}>
					{value && <ReactMarkdown children={value} />}
					{!isEditing && <ReactMarkdown children={additionalInfoValue} />}
				</ListItemValue>
				{isEditing && showAdditionalInfo && isChecked && [
					<TextInput
						key="additional-info"
						value={typeof additionalInfoValue === 'string' ? additionalInfoValue : ''}
						onChange={event => setItemValue({ index, newValue: event.target.value })}
					/>,
					<Spacer key="spacer" />
				]}
			</ListItemText>
		</StyledListItem>
	) : null
}

const ListBlock = ({
	name,
	pick,
	items,
	other,
	path,
	value,
	showItemAdditionalInfo,
	isEditing,
	updateCharacter
}) => {
	const checklist = value || {}

	const otherValue = checklist['other']
	const showOther = other && (isEditing || otherValue)

	const checkCount = Object.keys(checklist).reduce(
		(count, key) => count + (checklist[key] ? 1 : 0),
		0
	)

	if (!items) {
		throw new Error(`items not defined for '${name}'`)
	}

	const setItemValue = ({ index, newValue }) => {
		if (!isEditing) {
			return
		}

		const newChecklist = {
			...checklist,
			[index]: newValue,
		}
		updateCharacter({
			path,
			value: newChecklist,
		})
	}

	if (!isEditing && checkCount === 0) {
		return null
	}

	const showPick = isEditing && typeof pick === 'number'
	return [
		showPick && (
			<span key="pick">Pick {pick} {checkCount !== pick && '⚠️'}</span>
		),
		...items.map((item, index) => {
			const additionalInfo = R.prop(index, checklist)
			const isChecked = additionalInfo === undefined
				? pick === 'all'
				: !!additionalInfo

			return (isEditing || isChecked) && (
				<ListItem
					name={name}
					index={index}
					isEditing={isEditing}
					isChecked={isChecked}
					setItemValue={setItemValue}
					value={item}
					showAdditionalInfo={showItemAdditionalInfo}
					additionalInfoValue={additionalInfo}
				/>
			)
		}),
		showOther && (
			<ListItem
				name={name}
				index={'other'}
				isEditing={isEditing}
				isChecked={checklist['other']}
				setItemValue={setItemValue}
				showTextInput={true}
				value={isEditing && "Other"}
				showAdditionalInfo={true}
				additionalInfoValue={checklist['other']}
			/>
		)
	]
}

export default ListBlock