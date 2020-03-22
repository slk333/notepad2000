import React from 'react';
import { items } from '../data/colors'

export default function Table() {


	let firstItem = items[0]
	const keys = Object.keys(firstItem)

	const tableHeader = keys.map(function (key) {
		return (<th>{key}</th>)
	})

	const tableBody = items.map(function (item) {
		const values = Object.values(item)
		const columns = values.map(function (value) {
			return (<td>{value}</td>)
		})

		return (

			<tr>
				{columns}
			</tr>
		)
	})

	


	return (
		<table>
			<thead>
				<tr>
			{tableHeader}
			</tr>
			</thead>
			<tbody>
			{tableBody}
			</tbody>
		

		</table>
	)


}