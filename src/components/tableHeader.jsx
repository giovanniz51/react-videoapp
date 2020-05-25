import React from "react"

class TableHeader extends React.Component {
    raiseSort = path => {
		const sortColumn = {...this.props.sortColumn}
		if(sortColumn.path == path)
			sortColumn.order = sortColumn.order == "asc" ? "desc" : "asc"
		else{
			sortColumn.path = path
			sortColumn.orde = "asc"	
		}
			
		this.props.onSort(sortColumn)
    }
    
    render() {
        return (
        	<thead>
        		<tr>
        		    {this.props.columns.map(c => <th key={c.path || c.key} onClick={() => this.raiseSort(c.path)} scope="col">{c.label}</th>)}
        			<th scope="col"></th>
        			<th scope="col"></th>
        		</tr>
        	</thead>
        	)
    }
}

export default TableHeader