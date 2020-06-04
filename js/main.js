import slice from 'ramda/src/slice'
import prop from 'ramda/src/prop'
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
	const zipcode = prop('value', document.querySelector('#zip'))
	fetchCivicData(zipcode)
		.then((data) => {
			const officeLowerThanVP = slice(
				2, Infinity, prop('offices', data)
			)
			console.log(officeLowerThanVP)
		})
}
zipForm.addEventListener('submit', submitZipcode)