import slice from 'ramda/src/slice'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import 'regenerator-runtime/runtime'

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

export default async (zipcode) => {
	await fetchCivicData(zipcode)
		.then((data) => {
			const officesLowerThanVP = slice(
				2, Infinity, prop('offices', data)
			)
			return buildOffices(officesLowerThanVP, data)
		})
}
