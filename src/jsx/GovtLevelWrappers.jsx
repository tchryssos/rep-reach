import { h, Fragment } from 'preact'
import map from 'ramda/src/map'
import includes from 'ramda/src/includes'

import CityIcon from '/src/static/city.svg'
import CapitolIcon from '/src/static/capitol-building.svg'

import StateDefsSvg from '/src/jsx/StateDefsSvg.jsx'

import './GovtLevelWrappers.css'

const LevelSection = ({ level, reps, city, state }) => {
	const sectionData = { title: '', icon: '' }

	if (level === 'locality') {
		sectionData.title = city
		sectionData.icon = CityIcon
	} else if (includes('administrativeArea', level)) {
		sectionData.title = `${state} State`
		// sectionData.icon = StateIcons
	} else {
		sectionData.title = 'National'
		sectionData.icon = CapitolIcon
	}

	return (
		<div class="levelSection">
			<div class="sectionHeader">
				<div class="sectionTitleWrapper">
					<h2>{sectionData.title}</h2>
				</div>
				<div class="sectionDivider" />
			</div>
		</div>
	)
}

const GovtLevelWrappers = ({ levels, reps, city, state }) => {
	if (!levels.length) {
		return null
	}
	return (
		<Fragment>
			<StateDefsSvg />
			{map(
				(level) => (
					<LevelSection
						level={level}
						reps={reps}
						city={city}
						state={state}
					/>
				),
				levels,
			)}
		</Fragment>
	)
}

export default GovtLevelWrappers
