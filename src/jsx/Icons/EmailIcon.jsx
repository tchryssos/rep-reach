import { h } from 'preact'

import Icon from '/src/jsx/Icons/Icon.jsx'

const EmailIcon = ({ className }) => (
	<Icon className={className}>
		<path 
			d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
		/>
	</Icon>
)

export default EmailIcon