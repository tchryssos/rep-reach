import { h } from 'preact'
import map from 'ramda/src/map'
import replace from 'ramda/src/replace'

import PhoneIcon from '/src/jsx/Icons/PhoneIcon'
import EmailIcon from '/src/jsx/Icons/EmailIcon'

import './RepSet.css'

const ContactText = ({ type, contactPoint }) => {
	let formattedContact = contactPoint
	switch (type) {
		case 'phone':
			formattedContact = replace(
				/[(|)]/g,
				'',
				replace(
					/\s/, '-', formattedContact,
				),
			)
			return (
				<a
					href={`tel:${formattedContact}`}
					target="_blank"
					rel="noreferrer"
				>
					{contactPoint}
				</a>
			)
		case 'email':
			return (
				<a
					target="_blank"
					rel="noreferrer"
					href={`mailto:${formattedContact}`}
				>
					{contactPoint}
				</a>
			)
		default:
			return <p>{formattedContact}</p>
	}
}

const Contacts = ({ Icon, contactInfo = [], type }) => {
	if (!contactInfo.length) {
		return null
	}
	return map(
		(contactPoint) => (
			<div class="iconRow">
				<div class="iconWrapper">
					<Icon />
				</div>
				<ContactText type={type} contactPoint={contactPoint} />
			</div>
		),
		contactInfo,
	)
}

const RepSet = ({ officeName, officials }) => {
	return (
		<div class="officeWrapper">
			<h3>{officeName}</h3>
			{map(
				({
					officialName, officialChannels, officialEmails, officialPages,
					officialPhones,
				}) => (
					<div class="repWrapper">
						<h4>{officialName}</h4>
						<Contacts
							contactInfo={officialEmails}
							type="email"
							Icon={EmailIcon}
						/>
						<Contacts
							contactInfo={officialPhones}
							Icon={PhoneIcon}
							type="phone"
						/>
					</div>
				),
				officials,
			)}
		</div>
	)
}

export default RepSet
