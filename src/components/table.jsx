import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

export default ({columns, data, onSort, sortColumn, history}) => {
	return (
		<table className="table table-hover">
			<TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn}/>
			<TableBody history={history} cols={columns} data={data}></TableBody>
		</table>
	)
}