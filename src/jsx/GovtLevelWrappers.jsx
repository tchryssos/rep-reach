import { h, Fragment } from 'preact'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'

import StateDefsSvg from '/src/jsx/StateDefsSvg.jsx'
import Rep from '/src/jsx/Rep.jsx'

import './GovtLevelWrappers.css'

const Reps = ({ reps }) => map(
	({
		officeName, officialName, officialChannels, officialEmails, officialPages,
		officialPhones,
	}) => (
		<Rep
			officeName={officeName}
			officialChannels={officialChannels}
			officialName={officialName}
			officialEmails={officialEmails}
			officialPages={officialPages}
			officialPhones={officialPhones}
		/>
	),
	reps,
)

const LevelSection = ({ level, reps, city, state }) => (
	<div class="levelSection">
		<div class="sectionHeader">
			<div class="sectionTitleWrapper">
				<h2>{level}</h2>
			</div>
			<div class="sectionDivider" />
		</div>
		<Reps reps={prop(level, reps)} />
	</div>
)

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
