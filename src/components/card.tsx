export const Card = ({ onClick, key, icon, label, isDisabled, href }: {
	onClick?: React.MouseEventHandler<HTMLDivElement>,
	label: string,
	key: string,
	icon?: string,
	href?: string,
	isDisabled?: Boolean,
}) => {
	const cardContents = (
		<>
			<div className={`icon ${icon}`}></div>
			<div className='label'>{label}</div>
		</>
	)
	return href ? (
		<a key={key}
			href={href}
			className='card'
		>
			{cardContents}
		</a>
	) : (
		<div key={key}
			className={`card ${isDisabled ? 'disabled' : ''}`}
			onClick={onClick}
		>
			{cardContents}
		</div>
	)

}