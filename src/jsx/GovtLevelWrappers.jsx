import { h, Fragment } from 'preact'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'

import StateDefsSvg from '/src/jsx/StateDefsSvg.jsx'
import RepSet from '/src/jsx/RepSet.jsx'

import './GovtLevelWrappers.css'

const Officials = ({ reps }) => map(
	({ officeName, officials }) => (
		<RepSet
			officeName={officeName}
			officials={officials}
		/>
	),
	reps,
)

const LevelSection = ({ level, reps }) => (
	<div class="levelSection">
		<div class="sectionHeader">
			<div class="sectionTitleWrapper">
				<h2>{level}</h2>
			</div>
			<div class="sectionDivider" />
		</div>
		<Officials reps={prop(level, reps)} />
	</div>
)

const GovtLevelWrappers = ({ levels, reps }) => {
	if (!levels.length) {
		return null
	}
	console.log(reps)
	return (
		<Fragment>
			<StateDefsSvg />
			{map(
				(level) => (
					<LevelSection
						level={level}
						reps={reps}
					/>
				),
				levels,
			)}
		</Fragment>
	)
}

export default GovtLevelWrappers
