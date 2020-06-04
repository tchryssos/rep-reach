import { h } from 'preact'
import { useState } from 'preact/hooks'
import map from 'ramda/src/map'

import AddressForm from '/src/jsx/AddressForm.jsx'

import './App.css'

const emptyArr = []
const App = () => {
	const [reps, setReps] = useState(emptyArr)
	return (
		<div class="bodyWrapper">
			<AddressForm setReps={setReps} />
			{map(
				o => <div>{o.officeName}</div>,
				reps,
			)}
		</div>
	)
}

export default App
