import 'regenerator-runtime/runtime'

// FORM SUBMIT
const zipForm = document.querySelector('#zipForm')

const fetchCivicData = async (zip) => {
	const resp = await fetch(
		`https://www.googleapis.com/civicinfo/v2/representatives?address=${zip}&key=${process.env.CIVIC_API_KEY}`,
	)
	return resp.json()
}
const submitZipcode = async (e) => {
	e.preventDefault()
	const zipcode = document.querySelector('#zip').value
	fetchCivicData(zipcode)
		.then((data) => {
			console.log(data)
		})
}
zipForm.addEventListener('submit', submitZipcode)