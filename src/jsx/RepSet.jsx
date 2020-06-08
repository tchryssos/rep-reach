import { h, Fragment } from 'preact'
import map from 'ramda/src/map'
import replace from 'ramda/src/replace'
import prop from 'ramda/src/prop'

import orNull from '/src/logic/orNull.js'

import PhoneIcon from '/src/jsx/Icons/PhoneIcon'
import EmailIcon from '/src/jsx/Icons/EmailIcon'
import WebIcon from '/src/jsx/Icons/WebIcon'
import FacebookIcon from '/src/jsx/Icons/FacebookIcon'
import TwitterIcon from '/src/jsx/Icons/TwitterIcon'
import Divider from '/src/jsx/Divider.jsx'

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
		case 'social': {
			const socialId = prop('id', formattedContact)
			const socialService = prop('type', formattedContact)
			let SocialIcon = WebIcon
			switch (socialService.toLowerCase()) {
				case 'facebook':
					SocialIcon = FacebookIcon
					break;
				case 'twitter':
					SocialIcon = TwitterIcon
					break;
				case 'youtube':
					// Ignore youtube
					// Civic API channel data is inconsistent
					return null
				default:
					break;
			}
			return (
				<Fragment>
					<div class="iconWrapper">
						<SocialIcon />
					</div>
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://www.${socialService}.com/${socialId}`}
					>
						{socialService.toLowerCase() === 'twitter' ? '@' : ''}{socialId}
					</a>
				</Fragment>
			)
		}
		default:
			return (
				<a
					target="_blank"
					rel="noreferrer"
					href={formattedContact}
				>
					{formattedContact}
				</a>
			)
	}
}

const Contacts = ({ Icon, contactInfo = [], type }) => orNull(
	contactInfo.length,
	map(
		(contactPoint) => (
			<div class="iconRow">
				{orNull(
					type !== 'social',
					<div class="iconWrapper">
						<Icon />
					</div>
				)}
				<ContactText type={type} contactPoint={contactPoint} />
			</div>
		),
		contactInfo,
	)
)

const RepSet = ({ officeName, officials }) => {
	return (
		<div class="officeWrapper">
			<h3>{officeName}</h3>
			<Divider dashed />
			<div class="officeRepsWrapper">
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
							<Contacts
								contactInfo={officialPages}
								Icon={WebIcon}
								type="webpage"
							/>
							<Contacts
								contactInfo={officialChannels}
								Icon={PhoneIcon}
								type="social"
							/>
						</div>
					),
					officials,
				)}
			</div>
		</div>
	)
}

export default RepSet
