import { h } from 'preact'

import './Icon.css'

const Icon = ({
	viewBox = '0 0 24 24',
	className,
	children,
}) => (
	<svg
		class={`svg ${className}`}
		viewBox={viewBox}
		xmlns="http://www.w3.org/2000/svg"
	>
		{children}
	</svg>
)

export default Icon
