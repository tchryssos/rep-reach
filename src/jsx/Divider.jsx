import { h } from 'preact'
import './Divider.css'

const Divider = ({ className, dashed }) => (
	<div class={`divider ${dashed && 'dashed'} ${className}`} />
)

export default Divider
