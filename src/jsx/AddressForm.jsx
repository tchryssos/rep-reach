import { h, Component } from 'preact'
import { useState } from 'preact/hooks'

import submitZipCode from '/src/logic/submitZipCode'

import './AddressForm.css'

const AddressForm = ({ setReps }) =>  {
	const [value, setValue] = useState('')

	const onSubmit = async (e) => {
		e.preventDefault()
		const offices = await submitZipCode(value)
		console.log(offices)
	}

	const onInput = (e) => {
		const { value } = e.target
		setValue(value)
	}

	return (
		<form id="addressForm" onSubmit={onSubmit}>
			<label for="zip">
				Zipcode:
				<input
					id="zip"
					name="zip"
					value={value}
					type="text"
					onInput={onInput}
				/>
			</label>
			<input class="submit" type="submit" />
		</form>
	)
}

export default AddressForm
