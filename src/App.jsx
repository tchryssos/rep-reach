import { h } from 'preact'
import { useState } from 'preact/hooks'
import map from 'ramda/src/map'
import keys from 'ramda/src/keys'
import prop from 'ramda/src/prop'

import AddressForm from '/src/jsx/AddressForm.jsx'

import './App.css'

const emptyArr = []
const App = () => {
	const [reps, setReps] = useState(emptyArr)
	console.log(reps)
	return (
		<div class="bodyWrapper">
			<AddressForm setReps={setReps} />
			{map(
				(level) => map(
					(office) => <div>{office.officeName}</div>,
					prop(level, reps),
				),
				keys(reps),
			)}
		</div>
	)
}

export default App
