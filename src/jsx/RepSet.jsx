import { h } from 'preact'
import map from 'ramda/src/map'

import './RepSet.css'

const RepSet = ({ officeName, officials }) => {
	return (
		<div class="officeWrapper">
			<h3>{officeName}</h3>
			{map(
				({
					officialName, officialChannels, officialEmails, officialPages,
					officialPhones,
				}) => (
					<div class="repWrapper">
						<h4>{officialName}</h4>
					</div>
				),
				officials,
			)}
		</div>
	)
}

export default RepSet
