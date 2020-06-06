import { h } from 'preact'
import { useState } from 'preact/hooks'
import assoc from 'ramda/src/assoc'
import prop from 'ramda/src/prop'

import submitAddress from '/src/logic/submitAddress'

import './AddressForm.css'

const AddressForm = ({ setReps, setState, setCity }) =>  {
	const [value, setValue] = useState({
		street: '',
		zip: '',
	})

	const onSubmit = async (e) => {
		e.preventDefault()
		await submitAddress(value, setValue, setReps, setState, setCity)
	}

	const onInput = (e) => {
		const { value: inputValue, id } = e.target
		setValue(assoc(id, inputValue, value))
	}

	return (
		<form id="addressForm" onSubmit={onSubmit}>
			<label for="street">
				Street Address:
				<input
					id="street"
					name="street"
					value={prop('street', value)}
					type="text"
					onInput={onInput}
				/>
			</label>
			<label for="zip">
				Zipcode:
				<input
					id="zip"
					name="zip"
					value={prop('zip', value)}
					type="text"
					onInput={onInput}
				/>
			</label>
			<input class="submit" type="submit" />
		</form>
	)
}

export default AddressForm
