import { h, Fragment } from 'preact'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'

import StateDefsSvg from '/src/jsx/StateDefsSvg.jsx'
import RepSet from '/src/jsx/RepSet.jsx'
import Divider from '/src/jsx/Divider.jsx'

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
			<Divider className="dividerMargin" />
		</div>
		<div class="officialsWrapper">
			<Officials reps={prop(level, reps)} />
		</div>
	</div>
)

const GovtLevelWrappers = ({ levels, reps }) => {
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
					/>
				),
				levels,
			)}
		</Fragment>
	)
}

export default GovtLevelWrappers
