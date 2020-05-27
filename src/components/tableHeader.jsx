import React from "react"

class TableHeader extends React.Component {
	raiseSort = path => {
		const sortColumn = {...this.props.sortColumn}
		if (sortColumn.path == path)
			sortColumn.order = sortColumn.order == "asc" ? "desc" : "asc"
		else {
			sortColumn.path = path
			sortColumn.orde = "asc"
		}

		this.props.onSort(sortColumn)
	}

	renderSortIcon = col => {
		const {sortColumn} = this.props;
		if (col.path !== sortColumn.path) return null
		if (sortColumn.order == "asc") return <i className="fa fa-sort-asc"></i>
		return <i className="fa fa-sort-desc"></i>
	}

	render() {
		return (
			<thead>
			<tr>
				{this.props.columns.map(c => <th className="clickable" key={c.path || c.key} onClick={() => this.raiseSort(c.path)}
												 scope="col">{c.label} {this.renderSortIcon(c)}</th>)}
				<th scope="col"></th>
				<th scope="col"></th>
			</tr>
			</thead>
		)
	}
}

export default TableHeader