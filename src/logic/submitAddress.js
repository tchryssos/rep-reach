import slice from 'ramda/src/slice'
import prop from 'ramda/src/prop'
import path from 'ramda/src/path'
import map from 'ramda/src/map'
import reduceBy from 'ramda/src/reduceBy'
import split from 'ramda/src/split'
import last from 'ramda/src/last'
import head from 'ramda/src/head'
import 'regenerator-runtime/runtime'

const fetchCivicData = async (addressString) => {
	const resp = await fetch(
		`https://www.googleapis.com/civicinfo/v2/representatives?address=${addressString}&key=${process.env.CIVIC_API_KEY}`,
	)
	return resp.json()
}

const buildOffices = (offices, civicData) => reduceBy(
	(acc, office) => (
		acc.concat({
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
		})
	),
	[],
	(office) => {
		const currentDivision = last(split('/', prop('divisionId', office)))
		const title = head(split(':', currentDivision))
		switch (title) {
			case 'place':
				return 'city'
			case 'sldl':
			case 'sldu':
			case 'cd':
				return 'state'
			case 'council_district':
				return 'county'
			default:
				return title
		}
	},
	offices,
)

export default async (value, setValue, setReps, setState, setCity) => {
	const { zip, street = '' } = value
	const addressString = encodeURIComponent(`${street}${zip}`)
	const formattedRepData = await fetchCivicData(addressString)
		.then((data) => {
			const officesLowerThanVP = slice(
				2, Infinity, prop('offices', data)
			)
			setCity(path(['normalizedInput', 'city'], data))
			setState(path(['normalizedInput', 'state'], data))
			return buildOffices(officesLowerThanVP, data)
		})
		setReps(formattedRepData)
		setValue({ street: '', zip: ''})
}
