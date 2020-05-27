import React from "react";
import _ from "lodash";
import {Link} from "react-router-dom"

export default ({data, cols, history}) => {
	const renderCell = (m, col) => {
		if (col.content) return col.content(m)
		const name = _.get(m, col.path)
		if (col.label == "Title") return <Link to={`/movies/edit/${m._id}`}>{name}</Link>
		return name
	}
	const createKey = (item, col) => {
		return item._id + (col.path || col.key)
	}
	return (
		<tbody>
		{data.map((m) => (
			<tr key={m._id}>
				{cols.map(c => <td key={createKey(m, c)}>{renderCell(m, c)}</td>)}
			</tr>
		))}</tbody>
	)
}