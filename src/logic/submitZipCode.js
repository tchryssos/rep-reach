import slice from 'ramda/src/slice'
import prop from 'ramda/src/prop'
import path from 'ramda/src/path'
import map from 'ramda/src/map'
import reduceBy from 'ramda/src/reduceBy'
import 'regenerator-runtime/runtime'

const fetchCivicData = async (zip) => {
	const resp = await fetch(
		`https://www.googleapis.com/civicinfo/v2/representatives?address=${zip}&key=${process.env.CIVIC_API_KEY}`,
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
	(office) => path(['levels', 0], office),
	offices,
)

export default async (zipcode, setReps, setState, setCity) => {
	const formattedRepData = await fetchCivicData(zipcode)
		.then((data) => {
			const officesLowerThanVP = slice(
				2, Infinity, prop('offices', data)
			)
			setCity(path(['normalizedInput', 'city'], data))
			setState(path(['normalizedInput', 'state'], data))
			return buildOffices(officesLowerThanVP, data)
		})
		setReps(formattedRepData)

}
