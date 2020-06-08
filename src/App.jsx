import { h } from 'preact'
import { useState } from 'preact/hooks'
import keys from 'ramda/src/keys'

import orNull from '/src/logic/orNull.js'

import AddressForm from '/src/jsx/AddressForm.jsx'
import GovtLevelWrappers from '/src/jsx/GovtLevelWrappers.jsx'

import './App.css'

const emptyReps = {}
const App = () => {
	const [reps, setReps] = useState(emptyReps)
	const [state, setState] = useState('')
	const [city, setCity] = useState('')
	const [name, setName] = useState('')
	const [viewSocials, setViewSocials] = useState(false)
	
	const socialOnChange = (e) => {
		setViewSocials(e.target.checked)
	}

	return (
		<div class="bodyWrapper">
			<AddressForm
				setReps={setReps}
				setState={setState}
				setCity={setCity}
				name={name}
				setName={setName}
			/>
			{orNull(
				keys(reps).length,
				<label for="viewSocials" class="viewSocialsLabel">
					Show social media accounts:
					<input
						type="checkbox"
						id="viewSocials"
						name="viewSocials"
						onChange={socialOnChange}
						class="viewSocialCheckbox"
					/>
				</label>
			)}
			<GovtLevelWrappers
				levels={keys(reps)}
				reps={reps}
				city={city}
				state={state}
				viewSocials={viewSocials}
			/>
		</div>
	)
}

export default App
