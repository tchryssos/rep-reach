import { h } from 'preact'
import { useState } from 'preact/hooks'
import keys from 'ramda/src/keys'

import AddressForm from '/src/jsx/AddressForm.jsx'
import GovtLevelWrappers from '/src/jsx/GovtLevelWrappers.jsx'

import './App.css'

const emptyArr = []
const App = () => {
	const [reps, setReps] = useState(emptyArr)
	const [state, setState] = useState('')
	const [city, setCity] = useState('')
	return (
		<div class="bodyWrapper">
			<AddressForm
				setReps={setReps}
				setState={setState}
				setCity={setCity}
			/>
			<GovtLevelWrappers
				levels={keys(reps)}
				reps={reps}
				city={city}
				state={state}
			/>
		</div>
	)
}

export default App
