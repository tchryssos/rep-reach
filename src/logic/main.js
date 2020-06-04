import slice from 'ramda/src/slice'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import 'regenerator-runtime/runtime'

// FORM SUBMIT
const zipForm = document.querySelector('#zipForm')

const fetchCivicData = async (zip) => {
	const resp = await fetch(
		`https://www.googleapis.com/civicinfo/v2/representatives?address=${zip}&key=${process.env.CIVIC_API_KEY}`,
	)
	return resp.json()
}

const buildOffices = (offices, civicData) => map(
	(office) => ({
		officeName: prop('name', office),
		officials: map(
			(index) => {
				const official = prop(index, prop('officials', civicData))
				return {
					officialName: prop('name', official),
					officialPhones: prop('phones', official),
					officialEmails: prop('emails', official),
					officialChannels: prop('channels', official),
					officialPages: prop('urls', official),
				}
			}, prop('officialIndices', office),
		)
	}), offices,
)

const submitZipcode = async (e) => {
	e.preventDefault()
	const zipcode = prop('value', document.querySelector('#zip'))
	fetchCivicData(zipcode)
		.then((data) => {
			const officesLowerThanVP = slice(
				2, Infinity, prop('offices', data)
			)
			const mappedOffices = buildOffices(officesLowerThanVP, data)
			console.log(mappedOffices)
		})
}
zipForm.addEventListener('submit', submitZipcode)