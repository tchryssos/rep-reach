import { h } from 'preact'
import map from 'ramda/src/map'
import includes from 'ramda/src/includes'

import CityIcon from '/src/static/city.svg'
import StateIcons from '/src/static/states.svg'
import CapitolIcon from '/src/static/capitol-building.svg'

const LevelSection = ({ level, reps, city, state }) => {
	const sectionData = { title: '', icon: '' }

		if (level === 'locality') {
			sectionData.title = city
			sectionData.icon = CityIcon
		} else if (includes('administrativeArea', level)) {
			sectionData.title = `${state} State`
			sectionData.icon = StateIcons
		} else {
			sectionData.title = 'National'
			sectionData.icon = CapitolIcon
		}

	return (
		<div class="levelSection">
			<h2>{sectionData.title}</h2>
		</div>
	)
}

const GovtLevelWrappers = ({ levels, reps, city, state }) => {
	if (!levels.length) {
		return null
	}
	return map(
		(level) => (
			<LevelSection
				level={level}
				reps={reps}
				city={city}
				state={state}
			/>
		),
		levels,
	)
}

export default GovtLevelWrappers
