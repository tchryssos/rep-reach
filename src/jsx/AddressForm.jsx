import { h, Component } from 'preact'

import submitZipCode from '/src/logic/submitZipCode'

import './AddressForm.css'

class AddressForm extends Component {
	state = { value: '' }

	onSubmit = async (e) => {
		e.preventDefault()
		const offices = await submitZipCode(this.state.value)
		console.log(offices)
	}

	onInput = (e) => {
		const { value } = e.target
		this.setState({ value })
	}

	render(_, { value }) {
		return (
			<form id="addressForm" onSubmit={this.onSubmit}>
				<label for="zip">
					Zipcode:
					<input
						id="zip"
						name="zip"
						value={value}
						type="text"
						onInput={this.onInput}
					/>
				</label>
				<input class="submit" type="submit" />
			</form>
		)
	}
}

export default AddressForm
