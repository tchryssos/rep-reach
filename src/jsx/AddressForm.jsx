import { h } from 'preact'
import { useState } from 'preact/hooks'
import assoc from 'ramda/src/assoc'
import prop from 'ramda/src/prop'

import submitAddress from '/src/logic/submitAddress'

import './AddressForm.css'

const AddressForm = ({ setReps, setState, setCity, name, setName, }) =>  {
	const [value, setValue] = useState({
		street: '',
		zip: '',
	})

	const onSubmit = async (e) => {
		e.preventDefault()
		await submitAddress(value, setValue, setReps, setState, setCity)
	}

	const onInput = (extSet) => (e) => {
		const { value: inputValue, id } = e.target
		if (extSet) {
			extSet(inputValue)
		} else {
			setValue(assoc(id, inputValue, value))
		}
	}

	return (
		<form id="addressForm" onSubmit={onSubmit}>
			<div class="inputWrapper">
			<label for="name">
					Name:
					<input
						id="name"
						name="name"
						value={name}
						type="text"
						onInput={onInput(setName)}
					/>
				</label>
				<label for="street">
					Street Address:
					<input
						id="street"
						name="street"
						value={prop('street', value)}
						type="text"
						onInput={onInput()}
					/>
				</label>
				<label for="zip">
					Zipcode:
					<input
						id="zip"
						name="zip"
						value={prop('zip', value)}
						type="text"
						onInput={onInput()}
					/>
				</label>
			</div>
			<input class="submit" type="submit" />
		</form>
	)
}

export default AddressForm
