import { h } from 'preact'
import map from 'ramda/src/map'

const LevelSection = ({ level, reps, city, state }) => {
	console.log(level, reps, city, state)
	return (
		<div>
			hello i am a section
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
