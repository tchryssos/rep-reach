import 'regenerator-runtime/runtime'

// FORM SUBMIT
const zipForm = document.querySelector('#zipForm')
const submitZipcode = async (e) => {
	e.preventDefault()
	const zipcode = document.querySelector('#zip').value
	const resp = await fetch(
		`https://www.googleapis.com/civicinfo/v2/representatives?address=${zipcode}&key=${process.env.CIVIC_API_KEY}`,
	)
	console.log(resp)
}
zipForm.addEventListener('submit', submitZipcode)