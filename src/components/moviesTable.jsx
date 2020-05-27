import React from "react"
import Like from "./like";

import Table from "./table"

class MoviesTable extends React.Component {
    columns = [
        {path: "title", label: "Title"},
        {path: "genre.name", label: "Genre"},
        {path: "numberInStock", label: "Stock"},
        {path: "dailyRentalRate", label: "Rate"},
        {key: "like", content: m => <Like liked={m.liked} id={m._id} onLike={this.props.onLike}></Like>},
        {key: "delete", content: m => <button
                onClick={() => this.props.onDelete(m._id)}
                className="btn btn-danger"
            >
                Delete
            </button>}
    ]

    render = () => {
        const {onSort, sortColumn, m} = this.props
        return (<Table history={this.props.history} columns={this.columns} data={m} onSort={onSort} sortColumn={sortColumn}></Table>)
    }


}

export default MoviesTable