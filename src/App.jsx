import { h } from 'preact'
import { useState } from 'preact/hooks'

import AddressForm from '/src/jsx/AddressForm.jsx'

import './App.css'

const App = () => {
	return (
		<div class="bodyWrapper">
			<AddressForm />
		</div>
)
}

export default App
