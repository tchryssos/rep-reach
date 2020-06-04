import { h, Component } from 'preact'

import submitZipCode from '/src/logic/submitZipCode'

import './AddressForm.css'

class AddressForm extends Component {
	state = { value: '' }

	onSubmit = (e) => {
		e.preventDefault()
		 const offices = submitZipCode(e.target.value)
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
					<input id="zip" name="zip" value={value} type="text" />
				</label>
				<input class="submit" type="submit" />
			</form>
		)
	}
}

export default AddressForm
